<script setup>
import SessionItem from "./SessionItem.vue";

const props = defineProps({
  movie: Object,
});
console.log(props.movie);
</script>

<template>
  <section v-if="movie">
    <div class="sectionContent">
      <h3>{{ movie.title }}</h3>
      <h4>Duration : {{ movie.duration }} min</h4>
      <div class="movieContent">
        <div class="movieContent1">
          <img :src="movie.poster" alt="Movie poster" />
        </div>
        <div class="movieContent2">
          <h4>Synopsis :</h4>
          <p>{{ movie.description }}</p>
          <div class="genreContent">
            <h4>Genres :</h4>
            <div
              class="genre"
              v-for="genre in movie.genres"
              :key="genre.id"
              :genre="genre"
            >
              {{ genre.name }}
            </div>
          </div>
          <SessionItem
            v-for="session in movie.sessions"
            :key="session.id"
            :session="session"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sectionContent {
  width: 100%;
  margin-inline: auto;
}

h3 {
  font-family: "EB Garamond", sans-serif;
  font-size: 2rem;
  line-height: 30px;
  margin: 30px 0 10px 0;
}

.movieContent {
  display: flex;
  width: 100%;
}

.movieContent1 {
  width: 50%;
  margin-right: 50px;
}

.movieContent1 img {
  width: 100%;
  margin-top: 10px;
  border-radius: 6px;
}

.movieContent2 {
  width: 50%;
  margin-top: 10px;
  p {
    margin-top: 10px;
  }
  .genreContent {
    display: flex;
    align-items: center;
    margin-top: 10px;
    h4 {
      margin-right: 4px;
    }
    .genre {
      text-transform: capitalize;
    }
  }
}

.movieContent2 p {
  font-size: 0.9rem;
  text-align: justify;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  width: 100%;
}

@media (max-width: 1024px) {
  .sectionContent h3 {
    margin: 10px 0 10px 0;
  }
}
</style>
