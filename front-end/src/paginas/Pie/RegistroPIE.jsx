// src/paginas/Pie/RegistroPIE.jsx
import React, { useState } from "react";

// Importar secciones
import EquipoAulaSection from "./secciones/EquipoAulaSection";
import PlanificacionSection from "./secciones/PlanificacionSection";
import TrabajoColaborativoSection from "./secciones/TrabajoColaborativoSection";
import ActividadComunidadSection from "./secciones/ActividadComunidadSection";
import LogrosSection from "./secciones/LogrosSection";
import EvaluacionSection from "./secciones/EvaluacionSection";

/**
 * Registro PIE (solo frontend)
 * - Orquesta pestañas
 * - Mantiene estados iniciales vacíos (mock) para que se vea funcional
 * - No conecta al backend; deja handlers preparados
 */
export default function RegistroPIE() {
  const [tab, setTab] = useState("equipo");

  // ⚙️ registroId simulado. Cuando lo uses desde la tabla de cursos,
  // puedes pasar el cursoId por URL y pedir/crear el registro en el backend.
  const [registroId] = useState(null);

  // Estados por sección (mapeados al models.py)
  const [equipoAula, setEquipoAula] = useState([]);
  const [planificacion, setPlanificacion] = useState({
    descripcion_curso: "",
    fortalezas: "",
    necesidades_apoyo: "",
    estrategias_generales: "",
    recursos_apoyo: "",
    observaciones: "",
  });
  const [trabajos, setTrabajos] = useState([]);
  const [actividadesComunidad, setActividadesComunidad] = useState([]);
  const [logros, setLogros] = useState([]);
  const [evaluacion, setEvaluacion] = useState({
    fecha_evaluacion: "",
    resultados: "",
    conclusiones: "",
    proyecciones: "",
  });

  // Placeholders para futura conexión (tu compa pega axios aquí)
  const handleSave = (seccion, payload) => {
    console.log("Guardar sección:", seccion, payload);
  };
  const handleDelete = (seccion, id) => {
    console.log("Eliminar en sección:", seccion, "id:", id);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Registro PIE</h2>
      <p className="text-muted">
        Interfaz por secciones basada en tu <code>models.py</code>. UI lista para conectar al backend.
      </p>

      {/* TABS Bootstrap puro */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "equipo" ? "active" : ""}`}
            onClick={() => setTab("equipo")}
            type="button"
          >
            Equipo de Aula
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "planificacion" ? "active" : ""}`}
            onClick={() => setTab("planificacion")}
            type="button"
          >
            Planificación
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "trabajo" ? "active" : ""}`}
            onClick={() => setTab("trabajo")}
            type="button"
          >
            Trabajo Colaborativo
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "comunidad" ? "active" : ""}`}
            onClick={() => setTab("comunidad")}
            type="button"
          >
            Actividad con Comunidad
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "logros" ? "active" : ""}`}
            onClick={() => setTab("logros")}
            type="button"
          >
            Logros de Aprendizaje
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "evaluacion" ? "active" : ""}`}
            onClick={() => setTab("evaluacion")}
            type="button"
          >
            Evaluación PIE
          </button>
        </li>
      </ul>

      {/* Contenido por tab */}
      {tab === "equipo" && (
        <EquipoAulaSection
          registroId={registroId}
          items={equipoAula}
          setItems={setEquipoAula}
          onSave={(payload) => handleSave("equipo_aula", payload)}
          onDelete={(id) => handleDelete("equipo_aula", id)}
        />
      )}

      {tab === "planificacion" && (
        <PlanificacionSection
          registroId={registroId}
          value={planificacion}
          setValue={setPlanificacion}
          onSave={(payload) => handleSave("planificacion", payload)}
        />
      )}

      {tab === "trabajo" && (
        <TrabajoColaborativoSection
          registroId={registroId}
          items={trabajos}
          setItems={setTrabajos}
          onSave={(payload) => handleSave("trabajo_colaborativo", payload)}
          onDelete={(id) => handleDelete("trabajo_colaborativo", id)}
        />
      )}

      {tab === "comunidad" && (
        <ActividadComunidadSection
          registroId={registroId}
          items={actividadesComunidad}
          setItems={setActividadesComunidad}
          onSave={(payload) => handleSave("actividad_comunidad", payload)}
          onDelete={(id) => handleDelete("actividad_comunidad", id)}
        />
      )}

      {tab === "logros" && (
        <LogrosSection
          registroId={registroId}
          items={logros}
          setItems={setLogros}
          onSave={(payload) => handleSave("logros", payload)}
          onDelete={(id) => handleDelete("logros", id)}
        />
      )}

      {tab === "evaluacion" && (
        <EvaluacionSection
          registroId={registroId}
          value={evaluacion}
          setValue={setEvaluacion}
          onSave={(payload) => handleSave("evaluacion", payload)}
        />
      )}
    </div>
  );
}