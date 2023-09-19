import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
