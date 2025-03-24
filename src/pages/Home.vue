<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";
import DateItem from "../components/DateItem.vue";
import MovieItem from "../components/MovieItem.vue";

const movies = ref([]);
const selectedDate = ref(null);
const days = ref(listDate());

function listDate() {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const today = new Date();
    today.setDate(today.getDate() + i);
    dates.push(new Date(today));
  }
  return dates;
}

// async function listTime(date) {
//   try {
//     const response = await api.getSessions(date);
//     console.log("Sessions reçues :", response);
//     availableTimes.value = response.map(
//       (session) => new Date(session.start_time)
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des horaires :", error);
//   }
// }

async function getMovies(date) {
  selectedDate.value = date.toISOString().split("T")[0];
  console.log(selectedDate.value);
  movies.value = await api.getMovies(selectedDate.value);
}

onMounted(() => {
  const today = days.value[0];
  getMovies(today);
});
</script>

<template>
  <ul>
    <DateItem
      v-for="date in days"
      :key="date.toISOString()"
      :date="date"
      @click="getMovies(date)"
      :class="{
        active: selectedDate == date.toISOString().split('T')[0],
      }"
    />
  </ul>
  <div class="movies">
    <img src="../assets/film.png" alt="" />
    <h2>Movies</h2>
  </div>
  <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />

  <!-- :movie="movie" Passe la valeur au composant -->

  <!-- <h2>Films pour le {{ selectedDate?.toLocaleDateString() }}</h2> -->
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

h1 {
  text-align: center;
  font-family: "EB Garamond", serif;
  font-size: 3rem;
}

.movies {
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
}
</style>
