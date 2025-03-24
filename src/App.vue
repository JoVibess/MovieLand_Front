<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "./store";
import { computed } from "vue";

const userStore = useUserStore();
const router = useRouter();

// Vérifie si l'utilisateur est sur la page /login
const isLoginPage = computed(() => router.currentRoute.value.path === "/login");
const isRegisterPage = computed(
  () => router.currentRoute.value.path === "/register"
);
function logout() {
  userStore.logout();
  router.push("/");
}

function login() {
  router.push("/login");
}
</script>

<template>
  <div>
    {{ userStore.name }}
    <header>
      <h1>MovieLand</h1>
      <div class="auth-buttons">
        <button
          class="loginLogout"
          v-if="userStore.accessToken && !isRegisterPage"
          @click="logout"
        >
          Logout
        </button>
        <button
          class="loginLogout"
          v-else-if="!isLoginPage && !isRegisterPage"
          @click="login"
        >
          Login
        </button>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.auth-buttons {
  display: flex;
  justify-content: end;
}
</style>
