// src/servicios/api.js
import axios from "axios";

// Compatibilidad: CRA (process.env.REACT_APP_*) y Vite (import.meta.env.VITE_*)
const API_BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8000/api"; // valor por defecto en desarrollo

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // necesario para cookies de sesión
});

// Opcional: manejar 401 globalmente
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;