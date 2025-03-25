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
  <section class="titleReserv">
    <div class="titleStyle">
      <div class="lineStyle"></div>
      <h1>
        Hello {{ reservations[0]?.User?.firstname }},<br />
        Your film bookings :
      </h1>
    </div>
  </section>

  <section
    class="movieSection"
    v-for="reservation in reservations"
    :key="reservation.id"
  >
    <div class="sectionContent">
      <h2>{{ reservation.Session?.Movie?.title }}</h2>
      <ul>
        <li>
          Time :
          {{ reservation.Session?.start_time.split("T")[1].split(".")[0] }}
        </li>
        <li>Duration : {{ reservation.Session?.Movie?.duration }} min</li>
        <li>Room : {{ reservation.Session?.Room?.name }}</li>
        <li>Row : {{ reservation.row_number }}</li>
        <li>Seat : {{ reservation.seat_number }}</li>
      </ul>
      <div class="movieContent">
        <div class="movieContent1">
          <img :src="reservation.Session?.Movie?.poster" alt="" />
        </div>
        <div class="movieContent2">
          <h3>Synopsis :</h3>
          <p>{{ reservation.Session?.Movie?.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
titleReserv {
  .titleStyle {
    display: flex;
    .lineStyle {
      width: 6px;
      height: 60px;
      background: linear-gradient(#007bff, transparent);
      margin-right: 8px;
      margin-top: 4px;
      border-radius: 2px 2px 0 0;
    }
    h1 {
      font-family: "Montserrat", sans-serif;
      text-align: start;
      font-size: 1.5rem;
      margin-bottom: 30px;
      font-weight: 600;
    }
  }
}
.movieSection {
  .sectionContent {
    border-top: solid 1px black;
    h2 {
      font-family: "EB Garamond", sans-serif;
      font-size: 1.6rem;
      line-height: 30px;
      margin: 30px 0 10px 0;
    }
    ul {
      display: flex;
      gap: 20px;
      li {
        list-style: none;
      }
    }
  }
  .movieContent {
    display: flex;
    gap: 50px;
    margin-bottom: 30px;
    .movieContent1 {
      width: 50%;
      img {
        width: 100%;
        border-radius: 8px;
      }
    }

    .movieContent2 {
      width: 50%;
      h3 {
        margin-top: 10px;
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 10px;
      }
      p {
        font-size: 0.9rem;
        text-align: justify;
        line-height: 24px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5; /* Nombre max de lignes */
        overflow: hidden;
        width: 100%; /* Optionnel, pour voir l'effet */
      }
    }
  }
}
</style>
