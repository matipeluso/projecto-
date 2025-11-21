import api from "./api";

export const crearSubdimensionItem = (data) =>
  api.post("/subdimension-items/", data).then((res) => res.data);

export const eliminarSubdimensionItem = (id) =>
  api.delete(`/subdimension-items/${id}/`).then((res) => res.data);
