// ✅ Todas las importaciones al inicio
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Cookies from 'js-cookie'; // 👈 Agrega aquí, junto con los demás imports
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Bootstrap y estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './estilos/personalizado.css';
import "bootstrap-icons/font/bootstrap-icons.css";
// ✅ Configuración de axios
axios.defaults.baseURL = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

// Obtener token CSRF desde las cookies
axios.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

// ✅ Render de React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();