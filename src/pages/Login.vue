<script setup>
import { ref } from "vue";
import { useUserStore } from "../store";
import router from "../router";
const email = ref("");
const password = ref("");
const store = useUserStore();
async function login() {
  await store.login(email.value, password.value);
  router.push("/");
}
</script>

<template>
  <section>
    <div class="input">
      <h1>Login</h1>
      <h2>Email :</h2>
      <input v-model="email" type="email" />
      <h2>Password :</h2>
      <input v-model="password" type="password" />
      <button class="loginLogout" @click="login" type="submit">Login</button>
    </div>
  </section>
</template>

<style>
section {
  display: flex;
  justify-content: center;
  .input {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 0.9rem;
      font-weight: 500;
      padding: 6px 0 2px 0;
    }
    button {
      margin-top: 20px;
    }
  }
}

.loginLogout {
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

.loginLogout:hover {
  background: linear-gradient(135deg, #0056b3, #003d80);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 85, 204, 0.4);
}

.loginLogout:active {
  transform: translateY(1px);
  box-shadow: 0 3px 6px rgba(0, 85, 204, 0.3);
}

.loginLogout:focus {
  outline: 2px solid rgba(0, 123, 255, 0.5);
}
</style>
