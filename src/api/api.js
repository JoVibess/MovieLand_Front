import axios from "axios";
import router from "../router";
import { useUserStore } from "../store";

class Api {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8081/api",
    });

    this.axiosInstance.interceptors.request.use(
      function (config) {
        config.headers.Authorization = localStorage.getItem("accessToken");
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error?.status == 401) {
          const store = useUserStore();
          store.logout();
          router.push("/");
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email, password) {
    const response = await this.axiosInstance.post(`/login`, {
      email,
      password,
    });

    return response.data?.accessToken;
  }

  async register(email, password, firstname) {
    const response = await this.axiosInstance.post(`/register`, {
      email,
      password,
      firstname,
    });

    return response.data?.accessToken;
  }

  async getMovies(date) {
    const response = await this.axiosInstance.get(`/movies`, {
      params: { date: date },
    });

    return response.data;
  }

  async getSession(session_id) {
    const response = await this.axiosInstance.get(`/session/${session_id}`);

    return response.data;
  }
  async postReservation(session_id, row_number, seat_number) {
    const response = await this.axiosInstance.post("/reservation", {
      session_id,
      row_number,
      seat_number,
    });
    return response.data;
  }
  async getReservation(session_id) {
    const response = await this.axiosInstance.get(
      `/reservations/${session_id}`
    );
    return response.data;
  }
  async getMyReservation() {
    const response = await this.axiosInstance.get("/reserva/me");
    return response.data;
  }
}

export default new Api();
