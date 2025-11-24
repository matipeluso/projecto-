import api from "./api";

export function listarApoderados(params = {}) {
  return api.get("/apoderados/", { params });
}

export function crearApoderado(payload) {
  return api.post("/apoderados/", payload);
}

export function actualizarApoderado(id, payload) {
  return api.patch(`/apoderados/${id}/`, payload);
}

export function eliminarApoderado(id) {
  return api.delete(`/apoderados/${id}/`);
}
