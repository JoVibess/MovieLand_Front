import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Reservation from "../pages/Reservation.vue";
import OrderSummary from "../pages/ReservationSum.vue";
import ReservationSum from "../pages/ReservationSum.vue";

async function requireAuth(to, from, next) {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    next();
  } else {
    next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
}

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/reservation/:session_id",
    component: Reservation,
    // beforeEnter: requireAuth,
  },
  {
    path: "/account",
    component: ReservationSum,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
