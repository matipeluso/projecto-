import api from "./api";

export function listarEstablecimientos(params = {}) {
  return api.get("/establecimientos/", { params });
}

export function crearEstablecimiento(payload) {
  return api.post("/establecimientos/", payload);
}

export function actualizarEstablecimiento(id, payload) {
  return api.patch(`/establecimientos/${id}/`, payload);
}

export function eliminarEstablecimiento(id) {
  return api.delete(`/establecimientos/${id}/`);
}
