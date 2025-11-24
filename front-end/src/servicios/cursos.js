import api from "./api";

export function listarCursos(params = {}) {
  return api.get("/cursos/", { params });
}

export function crearCurso(payload) {
  return api.post("/cursos/", payload);
}

export function actualizarCurso(id, payload) {
  return api.patch(`/cursos/${id}/`, payload);
}

export function eliminarCurso(id) {
  return api.delete(`/cursos/${id}/`);
}
