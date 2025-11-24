const slugify = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const RAW_SUBSECTOR_SECTIONS = [
  {
    title: "Educación Parvularia",
    items: [
      "Formación personal y social",
      "Comunicación y lenguaje verbal",
      "Relaciones lógico matemáticas",
      "Relación con el medio social",
      "Relación con el medio natural",
      "Comunicación: Lenguaje artístico",
    ],
  },
  {
    title: "Educación Básica",
    items: [
      "Lenguaje y comunicación",
      "Lenguas extranjeras",
      "Educación matemática",
      "Comprensión del medio social",
      "Comprensión del medio natural",
      "Educación artística",
      "Educación física",
      "Educación tecnológica",
    ],
  },
  {
    title: "Educación Media",
    items: [
      "Filosofía y Psicología",
      "Lenguaje y Comunicación",
      "Idioma Extranjero",
      "Matemática",
      "Historia, Geografía y Ciencias Sociales",
      "Biología",
      "Física",
      "Química",
      "Artes Visuales o Artes Musicales",
      "Educación Física",
      "Educación Tecnológica",
      "Religión",
    ],
  },
  {
    title: "Educación de Adultos",
    items: [
      "Lenguaje y comunicación",
      "Matemáticas",
      "Estudios sociales",
      "Ciencias naturales",
      "Formación en oficios (optativa)",
      "Formación instrumental",
      "Formación diferenciada",
      "Formación diferenciada (según plan)",
    ],
  },
];

export const SUBSECTOR_SECTIONS = RAW_SUBSECTOR_SECTIONS.map((section) => ({
  title: section.title,
  items: section.items.map((label, index) => ({
    id: `${slugify(section.title)}-${slugify(label)}-${index}`,
    label,
    group: section.title,
  })),
}));

export const SUBSECTOR_CATALOG = SUBSECTOR_SECTIONS.flatMap((section) => section.items);
export const SUBSECTOR_LOOKUP_BY_ID = Object.fromEntries(SUBSECTOR_CATALOG.map((item) => [item.id, item]));
export const SUBSECTOR_LOOKUP_BY_LABEL = Object.fromEntries(
  SUBSECTOR_CATALOG.map((item) => [item.label, item])
);

export const ESTRATEGIAS_CATALOG = [
  "Materiales y recursos alternativos para favorecer la comprensión de conceptos.",
  "Atención individualizada en determinados momentos de la clase o fuera de ella.",
  "Utilización de medios y recursos audiovisuales.",
  "Guías de estudios adicionales que refuercen el aprendizaje.",
  "Esquemas con síntesis de conceptos.",
  "Esquemas de síntesis por unidades de estudio.",
  "Material complementario (textos, láminas, juegos) para fortalecer los conceptos.",
  "Ubicación del estudiante en un lugar estratégico.",
  "Tiempo adicional para la realización de las actividades o tareas de aprendizaje.",
  "Graduación de exigencias acorde al nivel de aprendizaje del estudiante.",
  "Adecuación de procedimientos e instrumentos de evaluación de los aprendizajes.",
  "Utilización de estrategias de aprendizaje cooperativo y tutoría entre pares.",
  "Evaluaciones para determinar las fortalezas y debilidades en el aprendizaje.",
  "Otras (describa)",
].map((descripcion, index) => ({
  numero: index + 1,
  descripcion,
  requiereDetalle: descripcion.toLowerCase().includes("otras"),
}));

export const ESTRATEGIA_LOOKUP = Object.fromEntries(
  ESTRATEGIAS_CATALOG.map((item) => [item.numero, item])
);

export const APOYOS_INTERNOS = [
  { id: "grupo_diferencial", label: "Grupo diferencial", tipo: "interno" },
  { id: "aula_recursos", label: "Aula de recursos", tipo: "interno" },
  { id: "profesionales_apoyo", label: "Atención de profesionales de apoyo", tipo: "interno" },
  { id: "adaptaciones_curriculares", label: "Adaptaciones curriculares significativas", tipo: "interno" },
  { id: "otros_interno", label: "Otros (especificar)", tipo: "interno", requiereDescripcion: true },
];

export const APOYOS_EXTERNOS = [
  { id: "psicologo", label: "Psicólogo", tipo: "externo" },
  { id: "fonoaudiologo", label: "Fonoaudiólogo", tipo: "externo" },
  { id: "neurologo", label: "Neurólogo", tipo: "externo" },
  { id: "psicopedagogo", label: "Psicopedagogo / Educ. Diferencial", tipo: "externo" },
  { id: "otros_externo", label: "Otros (especificar)", tipo: "externo", requiereDescripcion: true },
];

export const APOYOS_CATALOG = [...APOYOS_INTERNOS, ...APOYOS_EXTERNOS].map((item) => ({
  ...item,
  apoyo: item.id,
}));

export const APOYO_LOOKUP = Object.fromEntries(
  APOYOS_CATALOG.map((item) => [item.id, item])
);
