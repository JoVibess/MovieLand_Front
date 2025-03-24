<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import api from "../api/api";
import MovieItem from "../components/MovieItem.vue";

const route = useRoute();
const router = useRouter();
const sessionId = route.params.session_id;

const sessionData = ref(null);
const movie = ref(null);
const rowsCount = ref(0);
const seatsPerRow = ref(0);
const selectedSeat = ref({ row: null, col: null });
const isTaken = ref([]);

async function fetchSessionData() {
  try {
    const response = await api.getSession(sessionId);
    console.log("Données de la session :", response);

    if (response) {
      sessionData.value = response;
      movie.value = response.movie;
      rowsCount.value = response.room.rows_count;
      seatsPerRow.value = response.room.seats_per_row;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la session :", error);
  }
}
//-----------------------------------------

async function fetchReservationData() {
  //   try {
  console.log(route.params.id);

  const reservations = await api.getReservation(sessionId);
  if (reservations) {
    for (const reservation of reservations) {
      isTaken.value.push([reservation?.row_number, reservation?.seat_number]);
    }
    console.log(isTaken.value);
  }
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des réservations :", error);
  //   }
}

//---------------------------------------------

function selectSeat(row, col) {
  selectedSeat.value.row = row;
  selectedSeat.value.col = col;
}

//---------------------------------------------

async function reserveSeat() {
  if (!selectedSeat.value) {
    alert("Veuillez sélectionner un siège !");
    return;
  }

  try {
    const response = await api.postReservation(
      sessionId,
      selectedSeat.value.row,
      selectedSeat.value.col
    );
    console.log("Réservation réussie :", response);

    //   Rediriger vers la page avec l'historique des réservations
    router.push("/account");
  } catch (error) {
    console.error(
      "Erreur lors de la réservation :",
      error.response?.data || error
    );
  }
}
function seatIsTaken(row, col) {
  console.log(isTaken.value);
  return isTaken.value.find((seat) => seat[0] == row && seat[1] == col);
}

onMounted(() => {
  fetchSessionData(), fetchReservationData();
});
</script>

<template>
  <h1>Reservation</h1>
  <MovieItem v-if="movie" :movie="movie" />

  <h2>Choose a seat</h2>

  <div class="seating-grid">
    <div v-for="row in rowsCount" :key="row" class="row">
      <button
        v-for="col in seatsPerRow"
        @click="selectSeat(row, col)"
        :key="col"
        :class="{
          seat: true,
          reserved: seatIsTaken(row, col),
          selected: selectedSeat.col == col && selectedSeat.row == row,
        }"
        :disabled="seatIsTaken(row, col)"
      ></button>
    </div>
  </div>

  <button class="loginLogout" @click="reserveSeat">Réserver</button>
</template>

<style scoped>
.seating-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  display: flex;
  gap: 10px;
}

h2 {
  margin-bottom: 16px;
}

.seat {
  width: 40px;
  height: 40px;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  background-color: #3678bf;
}
.seat:hover {
  background-color: #5eacff;
}

.selected {
  background-color: #5eacff;
}

.reserved,
.reserved:hover {
  background-color: rgb(160, 160, 160);
  cursor: not-allowed;
}

.loginLogout {
  margin-top: 20px;
}
</style>
