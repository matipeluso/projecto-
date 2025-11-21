// src/paginas/usuarios/Usuarios.jsx
import React, { useEffect, useMemo, useState } from "react";
import api from "../../servicios/api";

// Reutilizables
import Buscar from "../../componentes/interfaz/Buscar";
import BotonCrearConModal from "../../componentes/interfaz/BotonCrearConModal";
import BotonEditarConModal from "../../componentes/interfaz/BotonEditarConModal";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  // Combos opcionales (si tus endpoints existen)
  const [especialidades, setEspecialidades] = useState([]);
  const [establecimientos, setEstablecimientos] = useState([]);
  const [cargandoCombos, setCargandoCombos] = useState(true);

  const [error, setError] = useState("");

  // ---------- Carga inicial ----------
  async function cargarUsuarios() {
    setCargando(true);
    setError("");
    try {
      const { data } = await api.get("/api/usuarios/");
      setUsuarios(Array.isArray(data) ? data : (data?.results ?? []));
    } catch (e) {
      setError("No se pudo cargar la lista de usuarios.");
    } finally {
      setCargando(false);
    }
  }

  async function cargarCombos() {
    setCargandoCombos(true);
    try {
      const [esp, est] = await Promise.allSettled([
        api.get("/api/especialidades/"),
        api.get("/api/establecimientos/"),
      ]);

      if (esp.status === "fulfilled") {
        const d = esp.value.data;
        setEspecialidades(Array.isArray(d) ? d : (d?.results ?? []));
      }
      if (est.status === "fulfilled") {
        const d = est.value.data;
        setEstablecimientos(Array.isArray(d) ? d : (d?.results ?? []));
      }
    } finally {
      setCargandoCombos(false);
    }
  }

  useEffect(() => {
    cargarUsuarios();
    cargarCombos();
  }, []);

  // ---------- Búsqueda local ----------
  const filtrados = useMemo(() => {
    const q = (busqueda || "").toLowerCase().trim();
    if (!q) return usuarios;
    return usuarios.filter((u) =>
      (u.username || "").toLowerCase().includes(q) ||
      (u.first_name || "").toLowerCase().includes(q) ||
      (u.last_name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.especialidad?.nombre || "").toLowerCase().includes(q)
    );
  }, [usuarios, busqueda]);

  // ---------- Normalización segura para options ----------
  const listaEsp = Array.isArray(especialidades)
    ? especialidades
    : (especialidades?.results ?? []);
  const listaEst = Array.isArray(establecimientos)
    ? establecimientos
    : (establecimientos?.results ?? []);

  const opcionesEspecialidades = listaEsp.map((e) => ({
    value: String(e.id),
    label: e.nombre,
  }));
  const opcionesEstablecimientos = listaEst.map((es) => ({
    value: String(es.id),
    label: es.nombre,
  }));

  // ---------- Configuración de campos ----------
  function obtenerCamposUsuario() {
    const comunes = [
      { name: "username", label: "Usuario", required: true, col: "col-md-4" },
      { name: "first_name", label: "Nombre", col: "col-md-4" },
      { name: "last_name", label: "Apellidos", col: "col-md-4" },

      { name: "email", label: "Email", required: true, col: "col-md-6" },
      { name: "telefono", label: "Teléfono", col: "col-md-3" },
      {
        name: "tipo", label: "Tipo", type: "select", col: "col-md-3",
        options: [
          { value: "Interno", label: "Interno" },
          { value: "Externo", label: "Externo" },
        ],
      },
    ];

    if (opcionesEspecialidades.length > 0) {
      comunes.push({
        name: "especialidad_id", label: "Especialidad", type: "select", col: "col-md-6",
        options: opcionesEspecialidades,
      });
    }
    if (opcionesEstablecimientos.length > 0) {
      comunes.push({
        name: "establecimiento", label: "Establecimiento", type: "select", col: "col-md-6",
        options: opcionesEstablecimientos,
      });
    }

    // Booleanos como selects (Sí/No)
    comunes.push(
      {
        name: "is_active", label: "Activo", type: "select", col: "col-md-3",
        options: [{ value: "true", label: "Sí" }, { value: "false", label: "No" }],
      },
      {
        name: "is_staff", label: "Es staff", type: "select", col: "col-md-3",
        options: [{ value: "true", label: "Sí" }, { value: "false", label: "No" }],
      },
    );

    return comunes;
  }

  // Para CREAR agregamos contraseña (como texto por ahora)
  function obtenerCamposCrear() {
    const campos = obtenerCamposUsuario();
    campos.splice(
      campos.length - 2,
      0,
      { name: "password", label: "Contraseña inicial", col: "col-md-6" }
    );
    return campos;
  }

  // ---------- Transformación de payload ----------
  function transformarValoresUsuario(payload) {
    const out = { ...payload };

    // vacíos => null / eliminar
    if (out.telefono === "") out.telefono = null;
    if (out.especialidad_id === "") out.especialidad_id = null;
    if (out.establecimiento === "") delete out.establecimiento;

    // booleans desde selects "true"|"false" o boolean ya
    if (out.is_active !== undefined) out.is_active = out.is_active === "true" || out.is_active === true;
    if (out.is_staff  !== undefined) out.is_staff  = out.is_staff  === "true" || out.is_staff  === true;

    // si password vacío, no lo mandamos
    if (!out.password) delete out.password;

    // Por seguridad, casteamos ids a string (DRF soporta numérico/str numerable)
    if (out.especialidad_id != null) out.especialidad_id = String(out.especialidad_id);
    if (out.establecimiento != null) out.establecimiento = String(out.establecimiento);

    return out;
  }

  // ---------- CRUD ----------
  async function crearUsuario(payload) {
    const cuerpo = transformarValoresUsuario(payload);
    return api.post("/api/usuarios/", cuerpo).then((res) => {
      cargarUsuarios();
      return res;
    });
  }

  async function actualizarUsuario(id, payload) {
    const cuerpo = transformarValoresUsuario(payload);
    return api.patch(`/api/usuarios/${id}/`, cuerpo).then((res) => {
      cargarUsuarios();
      return res;
    });
  }

  async function eliminarUsuario(id) {
    if (!window.confirm("¿Eliminar este usuario? Esta acción no se puede deshacer.")) return;
    try {
      await api.delete(`/api/usuarios/${id}/`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("No se pudo eliminar el usuario.");
    }
  }

  // ---------- Edición: preparamos registro para valoresIniciales ----------
  function prepararRegistroParaEditar(u) {
    return {
      ...u,
      especialidad_id: u.especialidad?.id ?? "",
      establecimiento: u.establecimiento?.id ?? u.establecimiento ?? "",
      is_active: u.is_active ? "true" : "false",
      is_staff: u.is_staff ? "true" : "false",
      password: "", // no editamos password aquí
    };
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Usuarios</h3>

        <BotonCrearConModal
          textoBoton="+ Crear usuario"
          icono="bi-person-plus"
          titulo="Crear usuario"
          tamanoModal="modal-lg"
          campos={obtenerCamposCrear()}
          valoresIniciales={{ tipo: "Interno", is_active: "true", is_staff: "false" }}
          transformarValores={transformarValoresUsuario}
          onGuardar={crearUsuario}
          onExito={() => {/* opcional: toast éxito */}}
        />
      </div>

      <Buscar
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar por usuario, nombre, email o especialidad…"
        debounceMs={0}
        className=""
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Especialidad</th>
              <th>Establecimiento</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan={8}>Cargando…</td></tr>
            ) : filtrados.length === 0 ? (
              <tr><td colSpan={8} className="text-muted">No hay usuarios o sin resultados para “{busqueda}”.</td></tr>
            ) : (
              filtrados.map((u) => {
                const registroEdicion = prepararRegistroParaEditar(u);
                return (
                  <tr key={u.id}>
                    <td><code>{u.username}</code></td>
                    <td>{u.first_name} {u.last_name}</td>
                    <td>{u.email}</td>
                    <td>{u.telefono || "—"}</td>
                    <td>{u.tipo || "—"}</td>
                    <td>{u.especialidad?.nombre || "—"}</td>
                    <td>{u.establecimiento?.nombre || u.establecimiento || "—"}</td>
                    <td className="text-end">
                      <BotonEditarConModal
                        registro={registroEdicion}
                        titulo="Editar usuario"
                        textoBoton="Editar"
                        icono="bi-pencil-square"
                        className="btn btn-sm btn-outline-primary me-2"
                        campos={obtenerCamposUsuario()}
                        transformarValores={(p) => transformarValoresUsuario(p)}
                        onGuardar={(payload) => actualizarUsuario(u.id, payload)}
                        onExito={() => {/* opcional: toast éxito */}}
                      />
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarUsuario(u.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Info cuando no hay combos */}
      {!cargando && !cargandoCombos && (listaEsp.length === 0) && (listaEst.length === 0) && (
        <p className="text-muted small mt-2">
          * Nota: Los select de Especialidad/Establecimiento no se muestran porque aún no hay datos o endpoints disponibles.
        </p>
      )}
    </div>
  );
}