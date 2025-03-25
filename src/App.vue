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
  <header>
    <div class="logo">
      <h1>MovieLand</h1>
    </div>
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
  <main>
    <RouterView />
  </main>
  <footer>
    <div class="logo">
      <h1>MovieLand</h1>
    </div>
    <div class="menu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Movies</a></li>
        <li><a href="#">My reservation</a></li>
      </ul>
    </div>
    <div class="contact">
      <h2>Contact us :</h2>
      <ul>
        <li><img src="./assets/phone.png" alt="" />+33 06 06 06 06 06</li>
        <li><img src="./assets/mail.png" alt="" />contact@movieland.com</li>
        <li><img src="./assets/localiseur.png" alt="" /> 10 rue de la Paix</li>
      </ul>
    </div>
  </footer>
</template>

<style>
header {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  border-bottom: solid 1px white;
  background-color: rgb(40, 68, 132);
  position: relative;
  color: white;
  .logo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.auth-buttons {
  position: absolute;
  transform: translate(-100%, -50%);
  left: 98%;
  top: 50%;
}
footer {
  width: 100%;
  margin-top: 100px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(40, 68, 132);
  color: white;
  .logo {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      color: white;
      font-size: 5rem;
    }
  }
  .menu {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: solid 1px white;
    border-right: solid 1px white;
    ul {
      display: flex;
      flex-direction: column;
      gap: 12px;
      li {
        list-style: none;
        text-align: center;
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
        position: relative;
        padding-bottom: 5px;
        cursor: pointer;
        a {
          text-decoration: none;
          color: inherit;
        }
      }

      li::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 1px;
        background: currentColor;
        transition: width 0.2s ease-in-out, left 0.2s ease-in-out;
      }

      li:hover::after {
        width: 100%;
        left: 0;
      }
    }
  }

  .contact {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 1rem;
      font-weight: 500;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
      li {
        list-style: none;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          margin-right: 12px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  footer {
    .logo {
      h1 {
        font-size: 3rem;
      }
    }
  }
}

@media (max-width: 762px) {
  footer {
    flex-direction: column;
    gap: 30px;
    height: 420px;
    .logo {
      width: 100%;
      h1 {
        font-size: 3rem;
      }
    }
    .menu {
      width: 100%;
      border: none;
      border-top: solid 1px white;
      border-bottom: solid 1px white;
    }
    .contact {
      width: 100%;
    }
  }
}
</style>
