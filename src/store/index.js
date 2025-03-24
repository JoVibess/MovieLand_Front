import { defineStore } from "pinia";
import api from "../api/api";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      accessToken: localStorage.getItem("accessToken"),
    };
  },
  actions: {
    async login(email, password) {
      const token = await api.login(email, password);

      localStorage.setItem("accessToken", token);
      this.accessToken = token;
    },
    async register(email, password, firstname) {
      const token = await api.register(email, password, firstname);
      localStorage.setItem("accessToken", token);
      this.accessToken = token;
    },
    logout() {
      this.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
  getters: {},
});
