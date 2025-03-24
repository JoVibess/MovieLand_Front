<script setup>
import { ref } from "vue";
import { useUserStore } from "../store";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const firstname = ref("");
const store = useUserStore();
const router = useRouter();
async function register() {
  await store.register(email.value, password.value, firstname.value);
  router.push("/");
}
</script>

<template>
  <div class="input">
    <h1>Register</h1>
    <h2>First Name :</h2>
    <input v-model="firstname" type="text" />
    <h2>Email :</h2>
    <input v-model="email" type="email" />
    <h2>Passeword :</h2>
    <input v-model="password" type="password" />
  </div>

  <button class="loginLogout" @click="register" type="submit">Register</button>
</template>

<style scoped>
.input {
  margin-bottom: 10px;
  margin-inline: auto;
  h2 {
    font-size: 0.9rem;
    font-weight: 500;
    padding: 6px 0 2px 0;
  }
}
</style>
