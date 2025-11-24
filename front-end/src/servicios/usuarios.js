import api from "./api";

export function getUsuarios(params = {}) {
  return api.get("/usuarios/", { params });
}

export function crearUsuario(payload) {
  return api.post("/usuarios/", payload);
}

export function actualizarUsuario(id, payload) {
  return api.patch(`/usuarios/${id}/`, payload);
}

export function eliminarUsuario(id) {
  return api.delete(`/usuarios/${id}/`);
}
