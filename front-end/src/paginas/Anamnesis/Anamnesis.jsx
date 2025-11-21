// src/paginas/Anamnesis/Anamnesis.jsx
import React, { useState } from "react";

import IdentificacionEstudianteSection from "./secciones/IdentificacionEstudianteSection";
import InformantesSection from "./secciones/InformantesSection";
import EntrevistadoresSection from "./secciones/EntrevistadoresSection";
import DefinicionProblemaSection from "./secciones/DefinicionProblemaSection";
import SaludDesarrolloSection from "./secciones/SaludDesarrolloSection";
import AntecedentesFamiliaSection from "./secciones/AntecedentesFamiliaSection";
import AntecedentesEscolaresSection from "./secciones/AntecedentesEscolaresSection";
import ObservacionesGeneralesSection from "./secciones/ObservacionesGeneralesSection";

export default function Anamnesis() {
  const [tab, setTab] = useState("identificacion");

  // Cabecera (Anamnesis) – ignora evaluacion_integral en front
  const [anamnesisCabecera, setAnamnesisCabecera] = useState({
    fecha: "",
    definicion_problema: "",
    observaciones_generales: "",
    pdf_generado: null,
  });

  // 1. Identificación del Estudiante
  const [identificacion, setIdentificacion] = useState({
    nombre: "",
    sexo: "", // "F" | "M"
    fecha_nacimiento: "",
    edad_anios: "",
    edad_meses: "",
    pais_natal: "",
    domicilio: "",
    telefono: "",
    lengua_materna: "",
    grado_materna: { comprende: false, habla: false, lee: false, escribe: false },
    lengua_uso: "",
    grado_uso: { comprende: false, habla: false, lee: false, escribe: false },
    escolaridad_actual: "",
    establecimiento: "",
  });

  // 2. Informantes
  const [informantes, setInformantes] = useState([]); // [{id, fecha_entrevista, nombre, relacion_estudiante, presencia}]

  // 3. Entrevistadores
  const [entrevistadores, setEntrevistadores] = useState([]); // [{id, fecha_entrevista, nombre, rol_cargo}]

  // 5. Salud y Desarrollo (incluye 5.1 a 5.6)
  const [saludDesarrollo, setSaludDesarrollo] = useState({
    diagnostico_prev: "",
    primer_anio: {
      tipo_parto: "",
      motivo_cesarea: "",
      asistencia_parto: null,
      peso: "",
      talla: "",
      antecedentes_embarazo: "",
      eventos12m: {
        desnutricion: null,
        traumatismos: null,
        encefalitis: null,
        obesidad: null,
        intoxicacion: null,
        meningitis: null,
        fiebre_alta: null,
        enf_respiratoria: null,
        otra: "",
        convulsiones: null,
        asma: null,
      },
      hospitalizaciones: null,
      hosp_detalle: "",
      controles_salud: null,
      vacunas: null,
      observaciones: "",
    },
    sensoriomotriz: {
      fija_cabeza: "",
      se_sienta_solo: "",
      camina_sin_apoyo: "",
      primeras_palabras: "",
      primeras_frases: "",
      se_viste_solo: "",
      esfinter_vesical_diurno: "",
      esfinter_vesical_nocturno: "",
      esfinter_anal_diurno: "",
      esfinter_anal_nocturno: "",
      obs: "",
      actividad_motora: "",
      tono_muscular: "",
      gruesa: { estabilidad_caminar: null, caidas_frecuentes: null, dominancia_lateral: null },
      fina: { garra: null, prension: null, pinza: null, ensarta: null, dibuja: null, escribe: null },
      cognitivos: {
        reacciona_voces_caras: null,
        manipula_explora: null,
        demanda_objetos_compania: null,
        comprende_prohibiciones: null,
        sonrie_balbucea: null,
        descoordinacion_ojomano: null,
      },
    },
    vision_audicion: {
      estimulos_visuales: null,
      estimulos_auditivos: null,
      ojos_irritados_llorosos: null,
      reconoce_sonidos_familiares: null,
      dolores_cabeza: null,
      gira_cabeza_llamado_ruido: null,
      acerca_aleja_objetos: null,
      acerca_oidos_fuente_sonido: null,
      sigue_desplazamiento: null,
      tapa_golpea_oidos: null,
      dolores_oidos_frecuentes: null,
      movimientos_oculares_anormales: null,
      conductas_erroneas: null,
      pronunciacion_adecuada: null,
      dx_visual: null,
      dx_auditivo: null,
      observaciones: "",
    },
    lenguaje: {
      modo_comunicacion: "",
      otro_modo: "",
      expresivo: {
        balbucea_sonidos: null,
        emite_frases: null,
        gestos_senas_aisladas: null,
        relata_experiencias: null,
        emite_palabras_senas: null,
        emision_pronunciacion_clara: null,
      },
      comprensivo: {
        identifica_objetos: null,
        sigue_instrucciones_simples: null,
        identifica_personas: null,
        sigue_instrucciones_complejas: null,
        comprende_conceptos_abstractos: null,
        sigue_instrucciones_grupales: null,
        responde_preguntas_vida_diaria: null,
        comprende_relatos_noticias_cuentos: null,
      },
      perdida_lenguaje: { hubo: null, edad_motivo: "" },
      observaciones: "",
    },
    desarrollo_social: {
      se_relaciona_entorno: null,
      relacion_colaborativa: null,
      explica_razones: null,
      respeta_normas_sociales: null,
      participa_actividades_grupales: null,
      respeta_normas_escolares: null,
      opta_trabajo_individual: null,
      sentido_humor: null,
      lenguaje_ecolalico: null,
      movimientos_estereotipados: null,
      dificultad_adaptarse: null,
      pataletas_frecuentes: null,
      reaccion_estimulos: { luces: "", sonidos: "", personas_extranias: "" },
      observaciones: "",
    },
    estado_actual_salud: {
      vacunas_al_dia: null,
      trastorno_motor: null,
      epilepsia: null,
      problema_bronco_respiratorio: null,
      problemas_cardiacos: null,
      enfermedad_infecto_contagiosa: null,
      paraplejia: null,
      trastorno_emocional: null,
      perdida_auditiva: null,
      trastorno_conductual: null,
      perdida_visual: null,
      otro: "",
      control_tratamiento: "",
      alimentacion: "",
      alimentacion_otro: "",
      peso_apreciacion: "",
      suenio: {
        tipo: "",
        horas: "",
        insomnio: false,
        pesadillas: false,
        terrores_nocturnos: false,
        sonambulismo: false,
        despierta_buen_humor: false,
        duerme: "",
        especificar: "",
      },
      humor: {
        alegre: false,
        jugueton: false,
        risueno: false,
        triste: false,
        serio: false,
        rebelde: false,
        apatico: false,
        violento: false,
        otro: "",
      },
      observaciones: "",
    },
  });

  // 6. Familia
  const [familia, setFamilia] = useState({
    convivientes: [],
    salud_familia: "",
    observaciones: "",
  });

  // 7. Escolares
  const [escolar, setEscolar] = useState({
    trayectoria: {
      edad_ingreso: "",
      asistio_jardin: null,
      numero_colegios: "",
      modalidad: "",
      modalidad_otro: "",
      motivo_cambios: "",
      repitio: null,
      cursos_repetidos: "",
      motivo_repeticion: "",
    },
    situacion_actual: {
      nivel_curso: "",
      dif_aprendizaje: null,
      dif_participar: null,
      conducta_disruptiva: null,
      asiste_regularmente: null,
      asiste_con_agrado: null,
      apoyo_familiar_tareas: null,
      amigos: null,
    },
    actitud_familiar: {
      evalua_desempeno: "",
      evalua_motivos: "",
      respuesta_dificultades: [],
      respuesta_dificultades_otra: "",
      respuesta_exitos: [],
      respuesta_exitos_otra: "",
      refuerzos_premios: { afectivas: false, alimentos: false, ver_tv: false, juguetes: false, tiempo_libre: false, otros: "" },
      quienes_apoyan: { madre: false, padre: false, hermanos: false, otros_familiares: false, otros_profesionales: false },
      expectativas: "",
      ambiente_aprendizaje: "",
    },
    comentarios_observaciones: "",
  });

  // Handlers (futuros: conectar API)
  const guardarCabecera = () => console.log("Guardar cabecera Anamnesis:", anamnesisCabecera);
  const handleSave = (seccion, payload) => console.log("Guardar sección:", seccion, payload);
  const handleDelete = (seccion, id) => console.log("Eliminar en sección:", seccion, "id:", id);

  return (
    <div className="container mt-4">
      <h2 className="mb-1">Anamnesis</h2>
      <p className="text-muted mb-3">
        Entrevista a la familia: antecedentes de salud, escolares y sociales del estudiante.
      </p>

      {/* Cabecera */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={anamnesisCabecera.fecha}
                onChange={(e) => setAnamnesisCabecera({ ...anamnesisCabecera, fecha: e.target.value })}
              />
            </div>
            <div className="col-md-9 d-flex justify-content-end gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={guardarCabecera}>
                Guardar cabecera
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => console.log("Generar PDF (futuro)")}>
                Generar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bootstrap */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${tab === "identificacion" ? "active fw-semibold" : ""}`} onClick={() => setTab("identificacion")} type="button">
            1. Identificación del Estudiante
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "informantes" ? "active fw-semibold" : ""}`} onClick={() => setTab("informantes")} type="button">
            2. Informantes
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "entrevistadores" ? "active fw-semibold" : ""}`} onClick={() => setTab("entrevistadores")} type="button">
            3. Entrevistadores
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "definicion" ? "active fw-semibold" : ""}`} onClick={() => setTab("definicion")} type="button">
            4. Definición del Problema
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "salud" ? "active fw-semibold" : ""}`} onClick={() => setTab("salud")} type="button">
            5. Salud y Desarrollo
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "familia" ? "active fw-semibold" : ""}`} onClick={() => setTab("familia")} type="button">
            6. Antecedentes Familiares
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "escolar" ? "active fw-semibold" : ""}`} onClick={() => setTab("escolar")} type="button">
            7. Antecedentes Escolares
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "observaciones" ? "active fw-semibold" : ""}`} onClick={() => setTab("observaciones")} type="button">
            8. Observaciones
          </button>
        </li>
      </ul>

      {/* Panel de contenido */}
      <div className="tab-content">
        {tab === "identificacion" && (
          <IdentificacionEstudianteSection
            value={identificacion}
            setValue={setIdentificacion}
            onSave={() => handleSave("identificacion_estudiante", identificacion)}
          />
        )}

        {tab === "informantes" && (
          <InformantesSection
            items={informantes}
            setItems={setInformantes}
            onSave={() => handleSave("informantes", informantes)}
            onDelete={(id) => handleDelete("informantes", id)}
          />
        )}

        {tab === "entrevistadores" && (
          <EntrevistadoresSection
            items={entrevistadores}
            setItems={setEntrevistadores}
            onSave={() => handleSave("entrevistadores", entrevistadores)}
            onDelete={(id) => handleDelete("entrevistadores", id)}
          />
        )}

        {tab === "definicion" && (
          <DefinicionProblemaSection
            value={anamnesisCabecera.definicion_problema}
            setValue={(v) => setAnamnesisCabecera({ ...anamnesisCabecera, definicion_problema: v })}
            onSave={() => handleSave("definicion_problema", { definicion_problema: anamnesisCabecera.definicion_problema })}
          />
        )}

        {tab === "salud" && (
          <SaludDesarrolloSection
            value={saludDesarrollo}
            setValue={setSaludDesarrollo}
            onSave={() => handleSave("salud_desarrollo", saludDesarrollo)}
          />
        )}

        {tab === "familia" && (
          <AntecedentesFamiliaSection
            value={familia}
            setValue={setFamilia}
            onSave={() => handleSave("antecedentes_familia", familia)}
            onDelete={(id) => {
              const nuevo = familia.convivientes.filter((p) => p.id !== id);
              setFamilia({ ...familia, convivientes: nuevo });
              handleDelete("antecedentes_familia_persona", id);
            }}
          />
        )}

        {tab === "escolar" && (
          <AntecedentesEscolaresSection
            value={escolar}
            setValue={setEscolar}
            onSave={() => handleSave("antecedentes_escolares", escolar)}
          />
        )}

        {tab === "observaciones" && (
          <ObservacionesGeneralesSection
            value={anamnesisCabecera.observaciones_generales}
            setValue={(v) => setAnamnesisCabecera({ ...anamnesisCabecera, observaciones_generales: v })}
            onSave={() => handleSave("observaciones_generales", { observaciones_generales: anamnesisCabecera.observaciones_generales })}
          />
        )}
      </div>
    </div>
  );
}