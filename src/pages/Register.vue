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
  <section>
    <div class="input">
      <h1>Register</h1>
      <h2>First Name :</h2>
      <input v-model="firstname" type="text" />
      <h2>Email :</h2>
      <input v-model="email" type="email" />
      <h2>Passeword :</h2>
      <input v-model="password" type="password" />
      <button class="loginLogout" @click="register" type="submit">
        Register
      </button>
    </div>
  </section>
</template>

<style scoped>
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
  }
  button {
    margin-top: 20px;
  }
}
</style>
