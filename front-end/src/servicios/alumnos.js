// src/servicios/alumnos.js
import api from "./api";

// -------------------------------------------------------------------
// Función utilitaria para desenpaquetar respuestas (para DRF paginado)
// -------------------------------------------------------------------
function unpack(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results; // DRF paginado
  return [];
}

// -------------------------------------------------------------------
// 1) Obtener alumnos por curso  (NO SE MODIFICA - YA FUNCIONA BIEN)
// -------------------------------------------------------------------
export async function obtenerAlumnosPorCurso(cursoId) {
  // Trae el curso (para encabezado)
  const { data: curso } = await api.get(`/cursos/${cursoId}/`);

  // Trae alumnos por curso
  const { data } = await api.get(`/estudiantes/`, { params: { curso: cursoId } });
  const rows = unpack(data);

  const alumnos = rows.map((a) => ({
    id: a.id,
    run: a.run ?? "",
    nombreCompleto: a.nombres_apellidos ?? "",
    cursoNombre:
      a.curso?.nombre ||
      a.curso?.nombre_display ||
      curso?.nombre ||
      "",
  }));

  return { curso, alumnos };
}

// -------------------------------------------------------------------
// 2) NUEVO: Obtener un estudiante específico (para la ficha del formulario)
// -------------------------------------------------------------------
export async function obtenerEstudiante(id) {
  const { data } = await api.get(`/estudiantes/${id}/`);
  return data;
}

// -------------------------------------------------------------------
// 3) NUEVO: Obtener una Evaluación Integral específica
// -------------------------------------------------------------------
export async function obtenerEvaluacionIntegral(id) {
  const { data } = await api.get(`/evaluaciones-integrales/${id}/`);
  return data;
}
