import axios from 'axios';

const API_URL = '/api/salud/';

export const getAntecedenteSalud = (anamnesisId) => {
  return axios.get(API_URL, { params: { anamnesis: anamnesisId } });
};

export const crearAntecedenteSalud = (data) => {
  return axios.post(API_URL, data);
};

export const actualizarAntecedenteSalud = (id, data) => {
  return axios.put(`${API_URL}${id}/`, data);
};

export const eliminarAntecedenteSalud = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};

export const obtenerPDFSalud = (id) => {
  return axios.get(`${API_URL}${id}/pdf/`, { responseType: 'blob' });
};
