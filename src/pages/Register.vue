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

  <button @click="register" type="submit">Register</button>
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

button {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 8px 14px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
  outline: none;
  display: inline-block;
  text-transform: uppercase;
}

button:hover {
  background: linear-gradient(135deg, #0056b3, #003d80);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 85, 204, 0.4);
}

button:active {
  transform: translateY(1px);
  box-shadow: 0 3px 6px rgba(0, 85, 204, 0.3);
}

button:focus {
  outline: 2px solid rgba(0, 123, 255, 0.5);
}
</style>
