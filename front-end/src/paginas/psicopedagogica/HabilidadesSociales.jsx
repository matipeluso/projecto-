import React from "react";

const ITEMS = [
  "Expresa verbal y/o corporalmente distintas emociones y sentimientos.",
  "Comparte con sus compañeros trabajo y/o actividades recreativas.",
  "Se relaciona afectivamente con los adultos de su medio.",
  "Se expresa con seguridad y confianza.",
  "Expresa sus sentimientos y emociones de acuerdo a la situación y contexto.",
  "Espera su turno en actividades grupales.",
  "Distingue que los comportamientos pueden producir consecuencias positivas o negativas.",
  "Expresa y reconoce distintas emociones y sentimientos en sí mismo y en los otros.",
  "Ajusta su actividad motriz a las exigencias del contexto y situación.",
  "Ante una dificultad o impedimento busca alternativas de solución.",
  "Inicia actividades de trabajo y/o recreativas.",
  "Utiliza diversos recursos para comunicarse e interactuar con su medio.",
  "Se muestra activo e interesado por su entorno.",
  "Solicita ayuda cuando la requiere.",
  "Acepta críticas y aportes en sus trabajos.",
];

const OPTIONS = ["1", "2", "3", "4", "0"];
const COMMENT_PROMPTS = [
  "Describa la mayor fortaleza del estudiante en esta área (y contexto en que se manifiesta)",
  "Describa la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)",
  "Síntesis: Señale el desempeño general del estudiante en esta área",
  "Observaciones (señale aspectos o antecedentes no considerados o que usted crea importante relevar o complementar)",
];

export default function HabilidadesSociales() {
  return (
    <div className="bg-white py-4">
      <div className="container">
        <div className="border rounded p-4 shadow-sm">
          <header className="text-center mb-4">
            <p className="text-uppercase small mb-1">Ley 20.201 – Decreto 170/2009</p>
            <h2 className="fw-bold text-uppercase mb-1">
              Evaluación Psicopedagógica y Curricular
            </h2>
            <p className="fw-semibold text-uppercase small">
              II.- Habilidades Sociales y Afectividad (Detección de NEE)
            </p>
          </header>

          <section className="mb-3">
            <div className="bg-warning px-3 py-2 rounded-top fw-semibold text-uppercase">
              Escala de observación
            </div>
            <div className="border border-top-0 rounded-bottom p-3 bg-light">
              <div className="row text-center fw-semibold">
                <div className="col">1 = siempre</div>
                <div className="col">2 = generalmente</div>
                <div className="col">3 = ocasionalmente</div>
                <div className="col">4 = casi nunca</div>
                <div className="col">0 = no observado</div>
              </div>
            </div>
          </section>

          <div className="table-responsive mb-4">
            <table className="table table-bordered table-sm align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th style={{ width: "40px" }}>N°</th>
                  <th className="text-start">Descripción</th>
                  <th>S<br /><small>(1)</small></th>
                  <th>G<br /><small>(2)</small></th>
                  <th>O<br /><small>(3)</small></th>
                  <th>N<br /><small>(4)</small></th>
                  <th>NO<br /><small>(0)</small></th>
                </tr>
              </thead>
              <tbody>
                {ITEMS.map((texto, index) => {
                  const name = `social_${index + 1}`;
                  return (
                    <tr key={name}>
                      <td className="text-center fw-bold">{index + 1}</td>
                      <td>{texto}</td>
                      {OPTIONS.map((valor) => (
                        <td key={`${name}-${valor}`} className="text-center">
                          <input type="radio" name={name} value={valor} className="form-check-input" />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <section className="row g-3 mb-4">
            {COMMENT_PROMPTS.map((label) => (
              <div className="col-12" key={label}>
                <label className="form-label">{label}</label>
                <textarea className="form-control" rows={label.includes("Síntesis") ? 2 : 3} />
              </div>
            ))}
          </section>

          <section className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">Nombre evaluador/a</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Fecha y firma</label>
              <input type="date" className="form-control" />
            </div>
          </section>

          <footer className="text-muted small">
            * Considere edad y curso de referencia. Los datos de este documento son confidenciales; su divulgación o uso indebido será penado por la ley.
          </footer>
        </div>
      </div>
    </div>
  );
}
