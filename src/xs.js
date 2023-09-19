import axios from "axios";

const xs = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

xs.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default xs;
