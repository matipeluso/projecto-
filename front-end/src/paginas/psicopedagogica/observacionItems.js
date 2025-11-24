export const OBSERVACION_ITEMS = [
  {
    item: 1,
    categoria: "academico",
    descripcion: "Atiende (mira y/o escucha) al profesor o a quien dirige las actividades del curso.",
  },
  {
    item: 2,
    categoria: "academico",
    descripcion: "Ejecuta lo solicitado en las instrucciones orales y/o en lengua de señas.",
  },
  {
    item: 3,
    categoria: "academico",
    descripcion: "Se concentra en las actividades solicitadas de acuerdo a su etapa de desarrollo.",
  },
  {
    item: 4,
    categoria: "academico",
    descripcion: "Mantiene atención sostenida al trabajar solo(a).",
  },
  {
    item: 5,
    categoria: "academico",
    descripcion: "Mantiene atención sostenida al trabajar con otros.",
  },
  {
    item: 6,
    categoria: "academico",
    descripcion: "Persiste en los trabajos y tareas hasta concluirlas.",
  },
  {
    item: 7,
    categoria: "academico",
    descripcion: "Desarrolla las actividades bajo supervisión del adulto.",
  },
  {
    item: 8,
    categoria: "academico",
    descripcion: "Se integra y participa en tareas grupales.",
  },
  {
    item: 9,
    categoria: "academico",
    descripcion: "Desarrolla actividades en forma autónoma.",
  },
  {
    item: 10,
    categoria: "academico",
    descripcion: "Elabora producciones plásticas y artísticas para relatar hechos, sucesos, vivencias.",
  },
  {
    item: 11,
    categoria: "social",
    descripcion: "Atiende a conversaciones y exposiciones de otros.",
  },
  {
    item: 12,
    categoria: "social",
    descripcion: "Respeta turnos en la conversación.",
  },
  {
    item: 13,
    categoria: "social",
    descripcion: "Participa en actividades de trabajo grupal.",
  },
  {
    item: 14,
    categoria: "social",
    descripcion: "Participa en actividades de juego colectivo.",
  },
  {
    item: 15,
    categoria: "social",
    descripcion: "Inicia juegos.",
  },
  {
    item: 16,
    categoria: "social",
    descripcion: "Inicia conversaciones.",
  },
  {
    item: 17,
    categoria: "social",
    descripcion: "Propone y organiza juegos y tareas.",
  },
  {
    item: 18,
    categoria: "social",
    descripcion: "Acepta críticas y aportes en sus trabajos.",
  },
  {
    item: 19,
    categoria: "social",
    descripcion: "Solicita ayuda cuando la necesita.",
  },
  {
    item: 20,
    categoria: "social",
    descripcion: "Acepta ayuda cuando se la ofrecen.",
  },
];

export const OBSERVACION_ITEMS_BY_CATEGORY = {
  academico: OBSERVACION_ITEMS.filter((item) => item.categoria === "academico"),
  social: OBSERVACION_ITEMS.filter((item) => item.categoria === "social"),
};
