// src/paginas/Pie/RegistroPIE.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../contexto/AuthContext";
import { listarCursos } from "../../servicios/cursos";
import { listarEstudiantes } from "../../servicios/estudiantes";
import { getUsuarios } from "../../servicios/usuarios";
import {
  actividadComunidadApi,
  equipoAulaApi,
  evaluacionPieApi,
  logrosApi,
  planificacionApi,
  registrosPIEApi,
  sincronizarColeccion,
  trabajoColaborativoApi,
  eliminarElemento,
} from "../../servicios/pie";

import EquipoAulaSection from "./secciones/EquipoAulaSection";
import PlanificacionSection from "./secciones/PlanificacionSection";
import TrabajoColaborativoSection from "./secciones/TrabajoColaborativoSection";
import ActividadComunidadSection from "./secciones/ActividadComunidadSection";
import LogrosSection from "./secciones/LogrosSection";
import EvaluacionSection from "./secciones/EvaluacionSection";

const planificacionVacia = {
  id: null,
  descripcion_curso: "",
  fortalezas: "",
  necesidades_apoyo: "",
  estrategias_generales: "",
  recursos_apoyo: "",
  observaciones: "",
};

const evaluacionVacia = {
  id: null,
  fecha_evaluacion: "",
  resultados: "",
  conclusiones: "",
  proyecciones: "",
};

const toArray = (payload) => (Array.isArray(payload) ? payload : payload?.results ?? []);
const tempId = () => {
  const tieneCrypto = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function";
  return `temp-${tieneCrypto ? crypto.randomUUID() : Date.now()}`;
};
const buildListSetter = (setter) => (valueOrFn) => {
  setter((prev) => {
    const next = typeof valueOrFn === "function" ? valueOrFn(prev) : valueOrFn;
    if (!next) return prev;
    if (!Array.isArray(next)) return prev;
    return next.map((item) => ({ ...item, id: item.id || tempId() }));
  });
};

export default function RegistroPIE() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRegistro = searchParams.get("registroId") || "";

  const [tab, setTab] = useState("equipo");
  const [registros, setRegistros] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [estudiantesCurso, setEstudiantesCurso] = useState([]);
  const [registroId, setRegistroId] = useState(initialRegistro);
  const [guardandoCabecera, setGuardandoCabecera] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const [cabecera, setCabecera] = useState({
    curso_id: "",
    responsable_id: user?.id ? String(user.id) : "",
    periodo: "",
    observaciones_generales: "",
  });

  const [equipoAula, setEquipoAula] = useState([]);
  const [planificacion, setPlanificacion] = useState(planificacionVacia);
  const [trabajos, setTrabajos] = useState([]);
  const [actividadesComunidad, setActividadesComunidad] = useState([]);
  const [logros, setLogros] = useState([]);
  const [evaluacion, setEvaluacion] = useState(evaluacionVacia);

  const setEquipoAulaForm = useMemo(() => buildListSetter(setEquipoAula), [setEquipoAula]);
  const setTrabajosForm = useMemo(() => buildListSetter(setTrabajos), [setTrabajos]);
  const setActividadesForm = useMemo(() => buildListSetter(setActividadesComunidad), [setActividadesComunidad]);
  const setLogrosForm = useMemo(() => buildListSetter(setLogros), [setLogros]);

  const mapItem = (item) => ({ ...item });
  const mapLogro = (item) => ({
    id: item.id,
    estudiante_id: item.estudiante?.id ?? item.estudiante ?? item.estudiante_id ?? null,
    fecha: item.fecha ?? "",
    logros: item.logros ?? "",
    dificultades: item.dificultades ?? "",
    estrategias_utilizadas: item.estrategias_utilizadas ?? "",
    comentarios: item.comentarios ?? "",
  });

  useEffect(() => {
    (async () => {
      try {
        const [{ data: dataRegistros }, { data: dataCursos }, { data: dataUsuarios }] = await Promise.all([
          registrosPIEApi.list(),
          listarCursos(),
          getUsuarios({ page_size: 200 }),
        ]);
        setRegistros(toArray(dataRegistros));
        setCursos(toArray(dataCursos));
        setUsuarios(toArray(dataUsuarios));
      } catch (error) {
        console.error(error);
        toast.error("No se pudieron cargar los catálogos iniciales.");
      }
    })();
  }, []);

  useEffect(() => {
    if (!cabecera.curso_id) {
      setEstudiantesCurso([]);
      return;
    }
    listarEstudiantes({ curso: cabecera.curso_id })
      .then(({ data }) => setEstudiantesCurso(toArray(data)))
      .catch(() => setEstudiantesCurso([]));
  }, [cabecera.curso_id]);

  useEffect(() => {
    if (!registroId) {
      setCabecera({
        curso_id: "",
        responsable_id: user?.id ? String(user.id) : "",
        periodo: "",
        observaciones_generales: "",
      });
      setPlanificacion(planificacionVacia);
      setEvaluacion(evaluacionVacia);
      setEquipoAula([]);
      setTrabajos([]);
      setActividadesComunidad([]);
      setLogros([]);
      return;
    }
    setCargandoDetalle(true);
    registrosPIEApi
      .retrieve(registroId)
      .then(({ data }) => {
        const cursoId = data.curso?.id ?? data.curso ?? "";
        const responsableId = data.responsable?.id ?? data.responsable ?? user?.id ?? "";
        setCabecera({
          curso_id: cursoId ? String(cursoId) : "",
          responsable_id: responsableId ? String(responsableId) : "",
          periodo: data.periodo ?? "",
          observaciones_generales: data.observaciones_generales ?? "",
        });
        setPlanificacion({ ...planificacionVacia, ...(data.planificacion ?? {}) });
        setEvaluacion({ ...evaluacionVacia, ...(data.evaluacion ?? {}) });
        setEquipoAula((data.equipo_aula ?? []).map(mapItem));
        setTrabajos((data.trabajos_colaborativos ?? []).map(mapItem));
        setActividadesComunidad((data.actividades_comunidad ?? []).map(mapItem));
        setLogros((data.logros ?? []).map(mapLogro));
      })
      .catch(() => toast.error("No se pudo cargar el registro seleccionado."))
      .finally(() => setCargandoDetalle(false));
  }, [registroId, user?.id]);

  const handleCabeceraChange = (e) => {
    const { name, value } = e.target;
    setCabecera((prev) => ({ ...prev, [name]: value }));
  };

  const actualizarSearchParam = (nuevoId) => {
    const next = new URLSearchParams(searchParams);
    if (nuevoId) {
      next.set("registroId", nuevoId);
    } else {
      next.delete("registroId");
    }
    setSearchParams(next, { replace: true });
  };

  const manejarSeleccionRegistro = (e) => {
    const value = e.target.value;
    setRegistroId(value);
    actualizarSearchParam(value);
  };

  const recargarRegistros = async () => {
    try {
      const { data } = await registrosPIEApi.list();
      setRegistros(toArray(data));
    } catch (error) {
      console.error(error);
    }
  };

  const guardarCabecera = async (e) => {
    e.preventDefault();
    if (!cabecera.curso_id) {
      toast.error("Selecciona un curso para continuar.");
      return;
    }
    const payload = {
      curso_id: Number(cabecera.curso_id),
      responsable_id: cabecera.responsable_id ? Number(cabecera.responsable_id) : user?.id ?? null,
      periodo: cabecera.periodo || null,
      observaciones_generales: cabecera.observaciones_generales || null,
    };
    setGuardandoCabecera(true);
    try {
      if (registroId) {
        await registrosPIEApi.update(registroId, payload);
        toast.success("Registro actualizado.");
      } else {
        const { data } = await registrosPIEApi.create(payload);
        setRegistroId(String(data.id));
        actualizarSearchParam(String(data.id));
        toast.success("Registro creado.");
      }
      await recargarRegistros();
    } catch (error) {
      const mensaje = error.response?.data?.detail || "No se pudo guardar la cabecera.";
      toast.error(mensaje);
    } finally {
      setGuardandoCabecera(false);
    }
  };

  const requiereRegistro = () => {
    if (registroId) return false;
    toast.error("Primero debes crear o seleccionar un registro PIE.");
    return true;
  };

  const refrescarRegistro = async () => {
    if (!registroId) return;
    try {
      const { data } = await registrosPIEApi.retrieve(registroId);
      setPlanificacion({ ...planificacionVacia, ...(data.planificacion ?? {}) });
      setEvaluacion({ ...evaluacionVacia, ...(data.evaluacion ?? {}) });
      setEquipoAula((data.equipo_aula ?? []).map(mapItem));
      setTrabajos((data.trabajos_colaborativos ?? []).map(mapItem));
      setActividadesComunidad((data.actividades_comunidad ?? []).map(mapItem));
      setLogros((data.logros ?? []).map(mapLogro));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveSeccion = async (seccion, payload) => {
    if (requiereRegistro()) return;
    const registroNumero = Number(registroId);
    if (!registroNumero) return;

    const acciones = {
      equipo_aula: async () => {
        await sincronizarColeccion(equipoAulaApi, payload, registroNumero);
      },
      trabajo_colaborativo: async () => {
        await sincronizarColeccion(trabajoColaborativoApi, payload, registroNumero);
      },
      actividad_comunidad: async () => {
        await sincronizarColeccion(actividadComunidadApi, payload, registroNumero);
      },
      logros: async () => {
        const normalizados = payload.map((item) => ({
          ...item,
          estudiante_id: item.estudiante_id ? Number(item.estudiante_id) : null,
        }));
        await sincronizarColeccion(logrosApi, normalizados, registroNumero);
      },
      planificacion: async () => {
        const body = { ...payload, registro: registroNumero };
        if (payload.id) {
          await planificacionApi.update(payload.id, body);
        } else {
          await planificacionApi.create(body);
        }
      },
      evaluacion: async () => {
        const body = { ...payload, registro: registroNumero };
        if (payload.id) {
          await evaluacionPieApi.update(payload.id, body);
        } else {
          await evaluacionPieApi.create(body);
        }
      },
    };

    try {
      await (acciones[seccion]?.() ?? Promise.resolve());
      await refrescarRegistro();
      toast.success("Sección guardada correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar la sección.");
    }
  };

  const handleDeleteItem = async (seccion, id) => {
    const tablas = {
      equipo_aula: [equipoAulaApi, setEquipoAula],
      trabajo_colaborativo: [trabajoColaborativoApi, setTrabajos],
      actividad_comunidad: [actividadComunidadApi, setActividadesComunidad],
      logros: [logrosApi, setLogros],
    };
    const config = tablas[seccion];
    if (!config) return;
    const [apiCrud, setter] = config;
    try {
      await eliminarElemento(apiCrud, id);
      setter((prev) => prev.filter((item) => item.id !== id));
      toast.success("Registro eliminado.");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el registro seleccionado.");
    }
  };

  const seccionBloqueada = !registroId;

  const registrosOptions = useMemo(
    () =>
      registros.map((r) => ({
        value: String(r.id),
        label: `${r.curso?.nombre ?? r.curso ?? "Registro"}${r.periodo ? ` - ${r.periodo}` : ""}`,
      })),
    [registros]
  );

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h2 className="mb-3">Registro PIE</h2>
        <p className="text-muted mb-1">Crea o edita un registro y luego completa las secciones.</p>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Registro existente</label>
            <select className="form-select" value={registroId} onChange={manejarSeleccionRegistro}>
              <option value="">— Crear nuevo registro —</option>
              {registrosOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <form className="card shadow-sm mb-4" onSubmit={guardarCabecera}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Curso</label>
              <select
                className="form-select"
                name="curso_id"
                value={cabecera.curso_id}
                onChange={handleCabeceraChange}
                required
                disabled={guardandoCabecera}
              >
                <option value="">Seleccione…</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Periodo</label>
              <input
                className="form-control"
                name="periodo"
                value={cabecera.periodo}
                onChange={handleCabeceraChange}
                placeholder="Ej: 2025 - Semestre 1"
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">Responsable</label>
              <input
                className="form-control"
                value={user ? `${user.first_name || user.username} ${user.last_name || ""}`.trim() : ""}
                disabled
              />
            </div>
            <div className="col-12">
              <label className="form-label">Observaciones generales</label>
              <textarea
                className="form-control"
                rows={2}
                name="observaciones_generales"
                value={cabecera.observaciones_generales}
                onChange={handleCabeceraChange}
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-end">
          <button type="submit" className="btn btn-primary" disabled={guardandoCabecera}>
            {registroId ? "Actualizar cabecera" : "Crear registro"}
          </button>
        </div>
      </form>

      {cargandoDetalle && registroId && <div className="alert alert-info">Cargando secciones…</div>}

      <ul className="nav nav-tabs mb-3">
        {[
          ["equipo", "Equipo de Aula"],
          ["planificacion", "Planificación"],
          ["trabajo", "Trabajo colaborativo"],
          ["comunidad", "Comunidad"],
          ["logros", "Logros"],
          ["evaluacion", "Evaluación"],
        ].map(([key, label]) => (
          <li className="nav-item" key={key}>
            <button
              className={`nav-link ${tab === key ? "active" : ""}`}
              type="button"
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {!registroId && (
        <div className="alert alert-warning">
          Crea o selecciona un registro para habilitar las secciones.
        </div>
      )}

      {tab === "equipo" && (
        <EquipoAulaSection
          registroId={registroId}
          items={equipoAula}
          setItems={setEquipoAulaForm}
          onSave={(payload) => handleSaveSeccion("equipo_aula", payload)}
          onDelete={(id) => handleDeleteItem("equipo_aula", id)}
          usuarios={usuarios}
        />
      )}

      {tab === "planificacion" && (
        <PlanificacionSection
          registroId={registroId}
          value={planificacion}
          setValue={setPlanificacion}
          onSave={(payload) => handleSaveSeccion("planificacion", payload)}
        />
      )}

      {tab === "trabajo" && (
        <TrabajoColaborativoSection
          registroId={registroId}
          items={trabajos}
          setItems={setTrabajosForm}
          onSave={(payload) => handleSaveSeccion("trabajo_colaborativo", payload)}
          onDelete={(id) => handleDeleteItem("trabajo_colaborativo", id)}
        />
      )}

      {tab === "comunidad" && (
        <ActividadComunidadSection
          registroId={registroId}
          items={actividadesComunidad}
          setItems={setActividadesForm}
          onSave={(payload) => handleSaveSeccion("actividad_comunidad", payload)}
          onDelete={(id) => handleDeleteItem("actividad_comunidad", id)}
        />
      )}

      {tab === "logros" && (
        <LogrosSection
          registroId={registroId}
          items={logros}
          setItems={setLogrosForm}
          onSave={(payload) => handleSaveSeccion("logros", payload)}
          onDelete={(id) => handleDeleteItem("logros", id)}
          estudiantes={estudiantesCurso}
        />
      )}

      {tab === "evaluacion" && (
        <EvaluacionSection
          registroId={registroId}
          value={evaluacion}
          setValue={setEvaluacion}
          onSave={(payload) => handleSaveSeccion("evaluacion", payload)}
        />
      )}
    </div>
  );
}