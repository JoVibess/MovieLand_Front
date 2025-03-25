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
const showPopup = ref(false);

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
  if (!selectedSeat.value.row || !selectedSeat.value.col) {
    alert("Veuillez sélectionner un siège !");
    return;
  }

  try {
    await api.postReservation(
      sessionId,
      selectedSeat.value.row,
      selectedSeat.value.col
    );
    showPopup.value = true; // Affiche le popup après réservation réussie
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
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup">
      <h3>Thanks for your reservation! 🎉</h3>
      <p>Your seat has been successfully reserved.</p>
      <button class="loginLogout" @click="router.push('/account')">
        See my reservation
      </button>
    </div>
  </div>
  <section>
    <h1>Reservation</h1>
  </section>
  <MovieItem v-if="movie" :movie="movie" />
  <section class="seatSection">
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
      <div class="ecran"><p>Screen</p></div>
      <button class="loginLogout" @click="reserveSeat">Réserver</button>
    </div>
  </section>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
}

.popup h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}
.seatSection {
  display: flex;
  flex-direction: column;
}
h1 {
  font-family: "Montserrat", sans-serif;
  text-align: start;
  font-size: 1.5rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.seating-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  .ecran {
    height: 20px;
    width: 80%;
    border: solid 1px black;
    background-color: rgb(160, 160, 160);
    border-radius: 6px;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      color: white;
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
}

.row {
  display: flex;
  gap: 10px;
}

h2 {
  margin-bottom: 24px;
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 80px;
}

.seat {
  width: 40px;
  height: 40px;
  border-radius: 10px 10px 4px 4px;
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
