import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Buscar from "../../componentes/interfaz/Buscar";
import BotonCrearConModal from "../../componentes/interfaz/BotonCrearConModal";
import BotonEditarConModal from "../../componentes/interfaz/BotonEditarConModal";
import {
  listarEstablecimientos,
  crearEstablecimiento,
  actualizarEstablecimiento,
  eliminarEstablecimiento,
} from "../../servicios/establecimientos";

const dependenciaOptions = [
  { value: "Municipal", label: "Municipal" },
  { value: "Particular Subvencionado", label: "Particular subvencionado" },
  { value: "Particular Pagado", label: "Particular pagado" },
  { value: "Corporación", label: "Corporación" },
];

function normalizarTexto(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function transformarEstablecimiento(vals) {
  const clean = (v) => {
    const str = (v ?? "").trim();
    return str === "" ? null : str;
  };
  return {
    nombre: (vals.nombre ?? "").trim(),
    rbd: clean(vals.rbd),
    direccion: clean(vals.direccion),
    comuna: clean(vals.comuna),
    region: clean(vals.region),
    telefono: clean(vals.telefono),
    email: clean(vals.email),
    tipo_dependencia: clean(vals.tipo_dependencia),
  };
}

const camposFormulario = [
  { name: "nombre", label: "Nombre", required: true, col: "col-md-6" },
  { name: "rbd", label: "RBD", col: "col-md-3" },
  {
    name: "tipo_dependencia",
    label: "Dependencia",
    type: "select",
    col: "col-md-3",
    options: dependenciaOptions,
  },
  { name: "direccion", label: "Dirección", col: "col-md-6" },
  { name: "comuna", label: "Comuna", col: "col-md-3" },
  { name: "region", label: "Región", col: "col-md-3" },
  { name: "telefono", label: "Teléfono", col: "col-md-3" },
  { name: "email", label: "Email", col: "col-md-3" },
];

export default function Establecimientos() {
  const navigate = useNavigate();
  const [establecimientos, setEstablecimientos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function cargarEstablecimientos() {
    setCargando(true);
    setError("");
    try {
      const { data } = await listarEstablecimientos();
      const items = Array.isArray(data) ? data : data?.results ?? [];
      setEstablecimientos(items);
    } catch (err) {
      console.error("[Establecimientos] Error al cargar", err);
      setError("No se pudo cargar la lista de establecimientos.");
      toast.error("No se pudo cargar la lista de establecimientos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarEstablecimientos();
  }, []);

  const filtrados = useMemo(() => {
    const q = normalizarTexto(busqueda);
    if (!q) return establecimientos;
    return establecimientos.filter((est) => {
      const keys = [
        normalizarTexto(est.nombre),
        normalizarTexto(est.rbd),
        normalizarTexto(est.comuna),
        normalizarTexto(est.region),
        normalizarTexto(est.tipo_dependencia),
      ];
      return keys.some((k) => k.includes(q));
    });
  }, [busqueda, establecimientos]);

  function prepararRegistro(est) {
    return {
      ...est,
      rbd: est.rbd ?? "",
      direccion: est.direccion ?? "",
      comuna: est.comuna ?? "",
      region: est.region ?? "",
      telefono: est.telefono ?? "",
      email: est.email ?? "",
      tipo_dependencia: est.tipo_dependencia ?? "",
    };
  }

  function irAEstructura(est) {
    const identificador = est.id ?? est.nombre;
    navigate(`/establecimientos/${encodeURIComponent(identificador)}/estructura`);
  }

  async function handleCrear(payload) {
    return crearEstablecimiento(payload)
      .then((res) => {
        toast.success("Establecimiento creado.");
        cargarEstablecimientos();
        return res;
      })
      .catch((err) => {
        const msg =
          err.response?.data?.detail || err.response?.data?.message || "No se pudo crear el establecimiento.";
        toast.error(msg);
        throw err;
      });
  }

  async function handleActualizar(id, payload) {
    return actualizarEstablecimiento(id, payload)
      .then((res) => {
        toast.success("Establecimiento actualizado.");
        cargarEstablecimientos();
        return res;
      })
      .catch((err) => {
        const msg =
          err.response?.data?.detail || err.response?.data?.message || "No se pudo actualizar el establecimiento.";
        toast.error(msg);
        throw err;
      });
  }

  async function handleEliminar(id) {
    if (!window.confirm("¿Eliminar este establecimiento?")) return;
    try {
      await eliminarEstablecimiento(id);
      setEstablecimientos((prev) => prev.filter((est) => est.id !== id));
      toast.success("Establecimiento eliminado.");
    } catch (err) {
      const msg = err.response?.data?.detail || err.response?.data?.message || "No se pudo eliminar el establecimiento.";
      toast.error(msg);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <div>
          <h2 className="h4 mb-1">Establecimientos</h2>
          <p className="text-muted mb-0">Consulta, busca o crea establecimientos vinculados a la plataforma.</p>
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-outline-secondary" onClick={cargarEstablecimientos}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refrescar
          </button>
          <BotonCrearConModal
            textoBoton="+ Nuevo establecimiento"
            icono="bi-building-add"
            titulo="Crear establecimiento"
            campos={camposFormulario}
            valoresIniciales={{ tipo_dependencia: "" }}
            transformarValores={transformarEstablecimiento}
            onGuardar={handleCrear}
          />
        </div>
      </div>

      <Buscar
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por nombre, RBD, comuna o dependencia…"
      />

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>RBD</th>
              <th>Comuna</th>
              <th>Región</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dependencia</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td colSpan={8}>Cargando…</td>
              </tr>
            ) : filtrados.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-muted">
                  No hay establecimientos o no coinciden con la búsqueda.
                </td>
              </tr>
            ) : (
              filtrados.map((est) => (
                <tr key={est.id || est.nombre}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => irAEstructura(est)}
                    >
                      {est.nombre}
                    </button>
                  </td>
                  <td>{est.rbd || "—"}</td>
                  <td>{est.comuna || "—"}</td>
                  <td>{est.region || "—"}</td>
                  <td>{est.telefono || "—"}</td>
                  <td>{est.email || "—"}</td>
                  <td>{est.tipo_dependencia || "—"}</td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <BotonEditarConModal
                        registro={prepararRegistro(est)}
                        titulo="Editar establecimiento"
                        textoBoton="Editar"
                        icono="bi-pencil-square"
                        className="btn btn-sm btn-outline-primary"
                        campos={camposFormulario}
                        transformarValores={transformarEstablecimiento}
                        onGuardar={(payload) => handleActualizar(est.id, payload)}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminar(est.id)}
                      >
                        Eliminar
                      </button>
                    </div>
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
