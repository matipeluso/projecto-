import api from "./api";

export async function crearApoyoAdicional(payload) {
  return api.post("/apoyos-adicionales/", payload);
}

export async function listarApoyosDeEvaluacion(idEvaluacion) {
  return api.get(`/apoyos-adicionales/?evaluacion=${idEvaluacion}`);
}
