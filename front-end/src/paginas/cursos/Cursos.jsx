import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Buscar from "../../componentes/interfaz/Buscar";
import BotonCrearConModal from "../../componentes/interfaz/BotonCrearConModal";
import { listarCursos, crearCurso } from "../../servicios/cursos";
import { listarEstablecimientos } from "../../servicios/establecimientos";

function norm(texto) {
  return (texto ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Cursos() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [establecimientos, setEstablecimientos] = useState([]);
  const [cargandoCombos, setCargandoCombos] = useState(false);

  async function cargarCursos() {
    setCargando(true);
    setError("");
    try {
      const { data } = await listarCursos();
      const items = Array.isArray(data) ? data : data?.results ?? [];
      setCursos(items);
    } catch (err) {
      console.error("[Cursos] Error al cargar", err);
      setError("No se pudo cargar la lista de cursos.");
      toast.error("No se pudo cargar la lista de cursos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCursos();
    cargarEstablecimientos();
  }, []);

  async function cargarEstablecimientos() {
    setCargandoCombos(true);
    try {
      const { data } = await listarEstablecimientos();
      const items = Array.isArray(data) ? data : data?.results ?? [];
      setEstablecimientos(items);
    } catch (err) {
      console.error("[Cursos] Error combos establecimientos", err);
    } finally {
      setCargandoCombos(false);
    }
  }

  const filtrados = useMemo(() => {
    const q = norm(busqueda);
    if (!q) return cursos;
    return cursos.filter((curso) =>
      [
        curso.nombre,
        curso.nivel,
        curso.establecimiento?.nombre,
        curso.anio_escolar,
      ]
        .filter(Boolean)
        .some((campo) => norm(campo).includes(q))
    );
  }, [busqueda, cursos]);

  function irAlumnos(curso) {
    if (!curso?.id) return;
    const establecimientoSlug = encodeURIComponent(
      curso.establecimiento?.id ?? curso.establecimiento?.nombre ?? "establecimiento"
    );
    navigate(`/establecimientos/${establecimientoSlug}/cursos/${curso.id}/alumnos`);
  }

  const opcionesEstablecimientos = useMemo(() => (
    [{ value: "", label: establecimientos.length ? "Seleccione establecimiento" : "Sin establecimientos" }].concat(
      establecimientos.map((est) => ({ value: String(est.id), label: est.nombre }))
    )
  ), [establecimientos]);

  function transformarCursoForm(vals) {
    const payload = {
      nombre: (vals.nombre ?? "").trim(),
      nivel: vals.nivel ? String(vals.nivel).trim() : null,
      anio_escolar: vals.anio_escolar ? Number(vals.anio_escolar) : null,
      establecimiento_id: vals.establecimiento_id || null,
    };
    if (!payload.nombre) delete payload.nombre; // validación ya la hace el modal, pero por seguridad
    if (!payload.nivel) delete payload.nivel;
    if (!payload.anio_escolar) delete payload.anio_escolar;
    if (!payload.establecimiento_id) delete payload.establecimiento_id;
    return payload;
  }

  async function handleCrearCurso(payload) {
    try {
      await crearCurso(payload);
      toast.success("Curso creado correctamente.");
      await cargarCursos();
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.response?.data?.message || "No se pudo crear el curso.";
      toast.error(msg);
      throw err;
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <div>
          <h2 className="h4 mb-1">Cursos</h2>
          <p className="text-muted mb-0">Listado general de cursos disponibles en la plataforma.</p>
        </div>
        <div className="d-flex gap-2">
          <BotonCrearConModal
            textoBoton="+ Nuevo curso"
            icono="bi-journal-plus"
            titulo="Crear curso"
            tamanoModal="modal-lg"
            campos={[
              { name: "nombre", label: "Nombre del curso", required: true, col: "col-md-6" },
              { name: "nivel", label: "Nivel", col: "col-md-3" },
              { name: "anio_escolar", label: "Año escolar", type: "number", col: "col-md-3", attrs: { min: 1900, max: 2100 } },
              {
                name: "establecimiento_id",
                label: "Establecimiento",
                type: "select",
                col: "col-md-6",
                options: opcionesEstablecimientos,
                required: establecimientos.length > 0,
                disabled: cargandoCombos || establecimientos.length === 0,
              },
            ]}
            valoresIniciales={{ anio_escolar: new Date().getFullYear(), establecimiento_id: "" }}
            transformarValores={transformarCursoForm}
            onGuardar={handleCrearCurso}
          />
          <button type="button" className="btn btn-outline-secondary" onClick={cargarCursos} disabled={cargando}>
            <i className="bi bi-arrow-clockwise me-1" aria-hidden="true"></i>
            Refrescar
          </button>
        </div>
      </div>

      <Buscar
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por curso, nivel, año o establecimiento…"
      />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Curso</th>
              <th>Nivel</th>
              <th className="text-center">Año escolar</th>
              <th>Establecimiento</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Cargando…
                </td>
              </tr>
            ) : filtrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No hay cursos para mostrar.
                </td>
              </tr>
            ) : (
              filtrados.map((curso) => (
                <tr key={curso.id || `${curso.nombre}-${curso.establecimiento?.nombre || "sin-est"}`}>
                  <td>{curso.nombre || "—"}</td>
                  <td>{curso.nivel || "—"}</td>
                  <td className="text-center">{curso.anio_escolar || "—"}</td>
                  <td>{curso.establecimiento?.nombre || curso.establecimiento || "—"}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => irAlumnos(curso)}
                    >
                      <i className="bi bi-people-fill me-1" aria-hidden="true"></i>
                      Ver alumnos
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
