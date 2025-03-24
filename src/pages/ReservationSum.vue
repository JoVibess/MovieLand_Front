<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import api from "../api/api";

let reservations = ref([]);

async function ReservationSum() {
  reservations.value = await api.getMyReservation();
  console.log(reservations.value);
}
onMounted(() => {
  ReservationSum();
});
</script>
<template>
  <h1>Hello {{ reservations[0]?.User?.firstname }}</h1>
  <h2>Your film bookings:</h2>
  <div class="sumContent">
    <div
      v-for="reservation in reservations"
      :key="reservation.id"
      class="custom"
    >
      {{ reservation.Session?.start_time.split("T")[1].split(".")[0] }}
      <div class="seatNumber">
        <h3>Your seat :</h3>
        <p>Row : {{ reservation.row_number }}</p>
        <p>Col : {{ reservation.seat_number }}</p>
      </div>
      <p>{{ reservation.Session?.Room?.name }}</p>
      <h3>Movie :</h3>
      <p>{{ reservation.Session?.Movie?.title }}</p>
      <img :src="reservation.Session?.Movie?.poster" alt="" />
    </div>
  </div>
</template>

<style scoped>
.sumContent {
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
}
.seatNumber {
  display: flex;
}
</style>
