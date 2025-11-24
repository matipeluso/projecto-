import { useCallback, useEffect, useMemo, useState } from "react";
import {
  actualizarEvaluacionPsico,
  crearEvaluacionPsico,
  obtenerEvaluacionPorEstudiante,
} from "../servicios/evaluacionPsico";
import { OBSERVACION_ITEMS } from "../paginas/psicopedagogica/observacionItems";
import {
  SUBSECTOR_CATALOG,
  SUBSECTOR_LOOKUP_BY_ID,
  ESTRATEGIAS_CATALOG,
  APOYOS_CATALOG,
} from "../paginas/psicopedagogica/catalogos";

const normalizeSmallInt = (value) => {
  if (value === null || typeof value === "undefined" || value === "") {
    return null;
  }
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const buildSubsectorState = () =>
  SUBSECTOR_CATALOG.reduce((acc, item) => {
    acc[item.id] = { destacado: false, dificultad: false };
    return acc;
  }, {});

const mergeSubsectorState = (records = []) => {
  const next = buildSubsectorState();
  records.forEach(({ subsector, tipo }) => {
    const catalogItem = SUBSECTOR_CATALOG.find((item) => item.label === subsector);
    if (!catalogItem) return;
    if (tipo === "destacado") {
      next[catalogItem.id].destacado = true;
    } else if (tipo === "dificultad") {
      next[catalogItem.id].dificultad = true;
    }
  });
  return next;
};

const buildEstrategiaState = () =>
  ESTRATEGIAS_CATALOG.reduce((acc, item) => {
    acc[item.numero] = {
      numero: item.numero,
      descripcion: item.descripcion,
      aplicada: false,
      exitosa: false,
      detalle: "",
    };
    return acc;
  }, {});

const mergeEstrategiasState = (records = []) => {
  const next = buildEstrategiaState();
  records.forEach(({ numero, aplicada, exitosa, detalle }) => {
    if (!numero || !next[numero]) return;
    next[numero] = {
      ...next[numero],
      aplicada: Boolean(aplicada),
      exitosa: Boolean(exitosa),
      detalle: detalle || "",
    };
  });
  return next;
};

const buildApoyosState = () =>
  APOYOS_CATALOG.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      tipo: item.tipo,
      apoyo: item.apoyo,
      label: item.label,
      requiereDescripcion: item.requiereDescripcion || false,
      recibido: null,
      descripcion_extra: "",
      nota: "",
    };
    return acc;
  }, {});

const mergeApoyosState = (records = []) => {
  const next = buildApoyosState();
  records.forEach(({ apoyo, tipo, recibido, descripcion_extra, nota }) => {
    if (!apoyo || !next[apoyo]) return;
    next[apoyo] = {
      ...next[apoyo],
      tipo: tipo || next[apoyo].tipo,
      recibido: typeof recibido === "boolean" ? recibido : next[apoyo].recibido,
      descripcion_extra: descripcion_extra || "",
      nota: nota || "",
    };
  });
  return next;
};

const buildBaseForm = ({ estudiante = "", evaluador_usuario = null } = {}) => ({
  estudiante,
  evaluador_usuario,
  observaciones: "",
  observaciones_ambiente: OBSERVACION_ITEMS.map((item) => ({ ...item, valor: null })),
  subsectores: buildSubsectorState(),
  estrategias: buildEstrategiaState(),
  apoyos: buildApoyosState(),
  edad_anios: "",
  edad_meses: "",
  lengua_materna_grado: "",
  lengua_materna_comprende: false,
  lengua_materna_habla: false,
  lengua_materna_lee: false,
  lengua_materna_escribe: false,
  lengua_uso_grado: "",
  lengua_uso_comprende: false,
  lengua_uso_habla: false,
  lengua_uso_lee: false,
  lengua_uso_escribe: false,
});

const mergeObservaciones = (lista = []) => {
  const map = new Map();
  lista.forEach((item) => {
    if (!item || typeof item.item === "undefined") return;
    map.set(Number(item.item), item);
  });
  return OBSERVACION_ITEMS.map((item) => {
    const saved = map.get(item.item);
    if (!saved) return { ...item, valor: null };
    return {
      ...item,
      id: saved.id ?? null,
      descripcion: saved.descripcion || item.descripcion,
      valor: typeof saved.valor === "number" ? saved.valor : null,
    };
  });
};

export default function useEvaluacionPsicopedagogica({ evaluadorUsuarioId } = {}) {
  const [form, setForm] = useState(() => buildBaseForm({ evaluador_usuario: evaluadorUsuarioId || null }));
  const [evaluacionId, setEvaluacionId] = useState(null);
  const [estudianteActual, setEstudianteActual] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!evaluadorUsuarioId) return;
    setForm((prev) => ({
      ...prev,
      evaluador_usuario: evaluadorUsuarioId,
    }));
  }, [evaluadorUsuarioId]);

  const resetForm = useCallback(
    (estudianteId = "") => {
      setForm(buildBaseForm({ estudiante: estudianteId, evaluador_usuario: evaluadorUsuarioId || null }));
    },
    [evaluadorUsuarioId]
  );

  const hydrateFromResponse = useCallback(
    (payload, fallbackEstudiante) => {
      if (!payload) {
        resetForm(fallbackEstudiante);
        setEvaluacionId(null);
        return;
      }
      setEvaluacionId(payload.id);
      setForm({
        estudiante: payload.estudiante ?? fallbackEstudiante ?? "",
        evaluador_usuario: payload.evaluador_usuario ?? evaluadorUsuarioId ?? null,
        observaciones: payload.observaciones || "",
        edad_anios:
          payload.edad_anios === null || typeof payload.edad_anios === "undefined"
            ? ""
            : String(payload.edad_anios),
        edad_meses:
          payload.edad_meses === null || typeof payload.edad_meses === "undefined"
            ? ""
            : String(payload.edad_meses),
        lengua_materna_grado: payload.lengua_materna_grado || "",
        lengua_materna_comprende: Boolean(payload.lengua_materna_comprende),
        lengua_materna_habla: Boolean(payload.lengua_materna_habla),
        lengua_materna_lee: Boolean(payload.lengua_materna_lee),
        lengua_materna_escribe: Boolean(payload.lengua_materna_escribe),
        lengua_uso_grado: payload.lengua_uso_grado || "",
        lengua_uso_comprende: Boolean(payload.lengua_uso_comprende),
        lengua_uso_habla: Boolean(payload.lengua_uso_habla),
        lengua_uso_lee: Boolean(payload.lengua_uso_lee),
        lengua_uso_escribe: Boolean(payload.lengua_uso_escribe),
        observaciones_ambiente: mergeObservaciones(payload.observaciones_ambiente || []),
        subsectores: mergeSubsectorState(payload.subsectores || []),
        estrategias: mergeEstrategiasState(payload.estrategias_apoyo || []),
        apoyos: mergeApoyosState(payload.apoyos_adicionales || []),
      });
    },
    [evaluadorUsuarioId, resetForm]
  );

  const loadEvaluacion = useCallback(
    async (estudianteId) => {
      setEstudianteActual(estudianteId || "");
      if (!estudianteId) {
        hydrateFromResponse(null, "");
        return null;
      }
      setIsLoading(true);
      try {
        const evaluacion = await obtenerEvaluacionPorEstudiante(estudianteId);
        hydrateFromResponse(evaluacion, estudianteId);
        return evaluacion;
      } finally {
        setIsLoading(false);
      }
    },
    [hydrateFromResponse]
  );

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateObservationValue = useCallback((itemNumber, valor) => {
    setForm((prev) => ({
      ...prev,
      observaciones_ambiente: prev.observaciones_ambiente.map((obs) =>
        obs.item === itemNumber ? { ...obs, valor } : obs
      ),
    }));
  }, []);

  const toggleSubsectorFlag = useCallback((subsectorId, tipo, checked) => {
    if (!subsectorId || !["destacado", "dificultad"].includes(tipo)) return;
    setForm((prev) => ({
      ...prev,
      subsectores: {
        ...prev.subsectores,
        [subsectorId]: {
          ...prev.subsectores[subsectorId],
          [tipo]: checked,
        },
      },
    }));
  }, []);

  const updateEstrategiaFlag = useCallback((numero, field, value) => {
    if (!numero || !["aplicada", "exitosa"].includes(field)) return;
    setForm((prev) => ({
      ...prev,
      estrategias: {
        ...prev.estrategias,
        [numero]: {
          ...prev.estrategias[numero],
          [field]: value,
        },
      },
    }));
  }, []);

  const updateEstrategiaDetalle = useCallback((numero, texto) => {
    setForm((prev) => ({
      ...prev,
      estrategias: {
        ...prev.estrategias,
        [numero]: {
          ...prev.estrategias[numero],
          detalle: texto,
        },
      },
    }));
  }, []);

  const updateApoyoRecibido = useCallback((apoyoId, value) => {
    if (!apoyoId) return;
    setForm((prev) => ({
      ...prev,
      apoyos: {
        ...prev.apoyos,
        [apoyoId]: {
          ...prev.apoyos[apoyoId],
          recibido: value,
        },
      },
    }));
  }, []);

  const updateApoyoDescripcion = useCallback((apoyoId, texto) => {
    if (!apoyoId) return;
    setForm((prev) => ({
      ...prev,
      apoyos: {
        ...prev.apoyos,
        [apoyoId]: {
          ...prev.apoyos[apoyoId],
          descripcion_extra: texto,
        },
      },
    }));
  }, []);

  const observacionesSeleccionadas = useMemo(
    () =>
      form.observaciones_ambiente
        .filter((item) => Number.isInteger(item.valor))
        .map(({ item, descripcion, valor }) => ({ item, descripcion, valor })),
    [form.observaciones_ambiente]
  );

  const subsectoresPayload = useMemo(() => {
    const resultados = [];
    Object.entries(form.subsectores).forEach(([id, estado]) => {
      const catalogItem = SUBSECTOR_LOOKUP_BY_ID[id];
      const label = catalogItem?.label;
      if (!label) return;
      if (estado.destacado) {
        resultados.push({ subsector: label, tipo: "destacado" });
      }
      if (estado.dificultad) {
        resultados.push({ subsector: label, tipo: "dificultad" });
      }
    });
    return resultados;
  }, [form.subsectores]);

  const estrategiasPayload = useMemo(() => {
    const resultados = [];
    Object.values(form.estrategias).forEach((item) => {
      if (!item) return;
      const shouldPersist = item.aplicada || item.exitosa || (item.detalle && item.detalle.trim() !== "");
      if (!shouldPersist) return;
      resultados.push({
        numero: item.numero,
        descripcion: item.descripcion,
        aplicada: item.aplicada,
        exitosa: item.exitosa,
        detalle: item.detalle || "",
      });
    });
    return resultados;
  }, [form.estrategias]);

  const apoyosPayload = useMemo(() => {
    const resultados = [];
    Object.values(form.apoyos).forEach((item) => {
      if (item?.recibido !== true) return;
      resultados.push({
        tipo: item.tipo,
        apoyo: item.apoyo,
        recibido: true,
        descripcion_extra: item.descripcion_extra || "",
        nota: item.nota || "",
      });
    });
    return resultados;
  }, [form.apoyos]);

  const saveEvaluacion = useCallback(async () => {
    if (!estudianteActual) {
      throw new Error("Debes seleccionar un estudiante antes de guardar.");
    }
    setIsSaving(true);
    try {
      const payload = {
        estudiante: estudianteActual,
        evaluador_usuario: evaluadorUsuarioId || form.evaluador_usuario || null,
      };
      if (typeof form.observaciones === "string") {
        payload.observaciones = form.observaciones;
      }
      payload.edad_anios = normalizeSmallInt(form.edad_anios);
      payload.edad_meses = normalizeSmallInt(form.edad_meses);
      payload.lengua_materna_grado = form.lengua_materna_grado || "";
      payload.lengua_materna_comprende = Boolean(form.lengua_materna_comprende);
      payload.lengua_materna_habla = Boolean(form.lengua_materna_habla);
      payload.lengua_materna_lee = Boolean(form.lengua_materna_lee);
      payload.lengua_materna_escribe = Boolean(form.lengua_materna_escribe);
      payload.lengua_uso_grado = form.lengua_uso_grado || "";
      payload.lengua_uso_comprende = Boolean(form.lengua_uso_comprende);
      payload.lengua_uso_habla = Boolean(form.lengua_uso_habla);
      payload.lengua_uso_lee = Boolean(form.lengua_uso_lee);
      payload.lengua_uso_escribe = Boolean(form.lengua_uso_escribe);
      payload.observaciones_ambiente = observacionesSeleccionadas;
      payload.subsectores = subsectoresPayload;
      payload.estrategias_apoyo = estrategiasPayload;
      payload.apoyos_adicionales = apoyosPayload;
      let response;
      if (evaluacionId) {
        response = await actualizarEvaluacionPsico(evaluacionId, payload);
      } else {
        response = await crearEvaluacionPsico(payload);
      }
      hydrateFromResponse(response, estudianteActual);
      return response;
    } finally {
      setIsSaving(false);
    }
  }, [
    estudianteActual,
    evaluadorUsuarioId,
    form.evaluador_usuario,
    form.observaciones,
    form.edad_anios,
    form.edad_meses,
    form.lengua_materna_grado,
    form.lengua_materna_comprende,
    form.lengua_materna_habla,
    form.lengua_materna_lee,
    form.lengua_materna_escribe,
    form.lengua_uso_grado,
    form.lengua_uso_comprende,
    form.lengua_uso_habla,
    form.lengua_uso_lee,
    form.lengua_uso_escribe,
    observacionesSeleccionadas,
    subsectoresPayload,
    estrategiasPayload,
    apoyosPayload,
    evaluacionId,
    hydrateFromResponse,
  ]);

  return {
    form,
    evaluacionId,
    estudianteActual,
    isLoading,
    isSaving,
    loadEvaluacion,
    updateField,
    updateObservationValue,
    toggleSubsectorFlag,
    updateEstrategiaFlag,
    updateEstrategiaDetalle,
    updateApoyoRecibido,
    updateApoyoDescripcion,
    resetForm,
    saveEvaluacion,
  };
}
