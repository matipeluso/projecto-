// src/servicios/api.js
import axios from "axios";

/*
 |--------------------------------------------------------------------------
 | CONFIGURACIÓN BASE DE LA API
 |--------------------------------------------------------------------------
 | Compatibilidad total con:
 |   - Vite: import.meta.env.VITE_API_BASE_URL
 |   - CRA:  process.env.REACT_APP_API_BASE_URL
 |
 | Si no encuentra ninguna variable, usa como fallback:
 |   http://localhost:8000/api
 |
 | Puedes definir la URL en tu archivo .env:
 |
 |  Vite →  VITE_API_BASE_URL="http://127.0.0.1:8000/api"
 |  CRA  →  REACT_APP_API_BASE_URL="http://127.0.0.1:8000/api"
 |
*/

const API_BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8000/api"; // fallback seguro

/*
 |--------------------------------------------------------------------------
 | CREAR INSTANCIA DE AXIOS
 |--------------------------------------------------------------------------
 | withCredentials: true → permite cookies de sesión si luego usas login
*/

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/*
 |--------------------------------------------------------------------------
 | INTERCEPTOR GLOBAL (OPCIONAL)
 |--------------------------------------------------------------------------
 | Aquí puedes manejar:
 |  - expiración de token JWT
 |  - errores 401 o 403
 |  - logs de red
 |
 | Por ahora solo dejamos una estructura mínima.
*/

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores globales
    // Ejemplo:
    // if (error.response?.status === 401) {
    //   alert("Tu sesión ha expirado");
    // }

    return Promise.reject(error);
  }
);

export default api;
