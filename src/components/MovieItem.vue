<script setup>
import SessionItem from "./SessionItem.vue";

const props = defineProps({
  movie: Object,
});
</script>

<template>
  <section v-if="movie">
    <div class="sectionContent">
      <h3>{{ props?.movie?.title }}</h3>
      <h4>Duration : {{ props?.movie?.duration }} min</h4>
      <div class="movieContent">
        <div class="movieContent1">
          <img :src="props?.movie?.poster" alt="" />
        </div>
        <div class="movieContent2">
          <h4>Synopsis :</h4>
          <p>{{ props?.movie?.description }}</p>
          <SessionItem
            v-for="session in props?.movie?.sessions"
            :key="session.id"
            :session="session"
          >
          </SessionItem>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  /* margin: 10px 0 30px 0; */
  .sectionContent {
    width: 100%;
    margin-inline: auto;
    h3 {
      font-family: "EB Garamond", sans-serif;
      font-size: 2rem;
      line-height: 30px;
      margin: 30px 0 10px 0;
    }
    h4 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .movieContent {
      display: flex;
      width: 100%;
      .movieContent1 {
        width: 50%;
        margin-right: 50px;
        img {
          width: 100%;
          margin-top: 10px;
          border-radius: 6px;
        }
      }
      .movieContent2 {
        width: 50%;
        h4 {
          margin-top: 10px;
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
}
@media (max-width: 1024px) {
  .movieSection .sectionContent {
    h3 {
      margin: 10px 0 6px 0;
    }
    h4 {
      margin-bottom: 6px;
    }
  }
}
</style>
