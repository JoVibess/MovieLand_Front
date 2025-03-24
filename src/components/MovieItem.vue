<script setup>
import SessionItem from "./SessionItem.vue";

const props = defineProps({
  movie: Object,
});
</script>

<template>
  <section class="movieSection" v-if="movie">
    <div class="sectionContent">
      <h3>{{ props?.movie?.title }}</h3>
      <h4>Time : {{ props?.movie?.duration }} min</h4>
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

<style>
.movieSection {
  margin-inline: auto;
  width: 100%;
  margin: 10px 0 30px 0;
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
          margin: 10px 0 10px 0;
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
          word-spacing: 2px;
        }
      }
    }
  }
}
@media (max-width: 1024px) {
  .movieSection .sectionContent {
    width: 100%;
    h3 {
      margin: 10px 0 6px 0;
    }
    h4 {
      margin-bottom: 6px;
    }
  }
}
</style>
