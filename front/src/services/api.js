import axios from "axios";

const api = axios.create({
  baseURL: "https://api.storeys.ae/api/v1",
});

export default api;
