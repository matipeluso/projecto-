import api from "./api";
import axios from 'axios';

const API_URL = '/api/psico/evaluaciones/';

// LISTAR TODAS LAS EVALUACIONES PSICOPEDAGÓGICAS
export async function listarEvaluacionesPsico() {
  const res = await api.get("/evaluaciones-psicopedagogicas/");
  return res.data;
}

// CREAR EVALUACIÓN
export async function crearEvaluacionPsico(datos) {
  const res = await api.post("/evaluaciones-psicopedagogicas/", datos);
  return res.data;
}

// ELIMINAR EVALUACIÓN
export async function eliminarEvaluacionPsico(id) {
  const res = await api.delete(`/evaluaciones-psicopedagogicas/${id}/`);
  return res.data;
}

// ACTUALIZAR EVALUACIÓN (PUT)
export async function actualizarEvaluacionPsico(id, datos) {
  const res = await api.put(`/evaluaciones-psicopedagogicas/${id}/`, datos);
  return res.data;
}

// CRUD con axios
export const getEvaluacionesPsico = () => axios.get(API_URL);
export const getEvaluacionPsico = (id) => axios.get(`${API_URL}${id}/`);
export const createEvaluacionPsico = (data) => axios.post(API_URL, data);
export const updateEvaluacionPsico = (id, data) => axios.put(`${API_URL}${id}/`, data);
export const deleteEvaluacionPsico = (id) => axios.delete(`${API_URL}${id}/`);

// Endpoints para PDF
export const getEvaluacionPsicoPDF = (id) => axios.get(`${API_URL}${id}/pdf/`, { responseType: 'blob' });

