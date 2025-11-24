import React from "react";

const ITEMS = [
  "Incorpora espontáneamente información relevante del medio (atención y memoria instrumental).",
  "Memoriza información utilizando medios auxiliares.",
  "Retiene y reproduce información.",
  "Distingue lo esencial de lo accesorio.",
  "Descompone un todo en sus partes (análisis).",
  "Construye una totalidad a partir de sus elementos (síntesis).",
  "Realiza una actividad que contiene diversos pasos.",
  "Anticipa consecuencias de una situación o fenómeno (razonamiento lógico).",
  "Transfiere o generaliza lo aprendido a otras situaciones.",
  "Se adapta a imprevistos o a nuevas rutinas de trabajo.",
  "Busca estrategias para resolver problemas de la vida diaria.",
  "Relaciona en base a características instrumentales (de uso) o situacionales de los objetos.",
  "Distingue rasgos o nexos esenciales comunes en objetos o fenómenos (abstracción).",
  "Explica (comprende) el significado de una metáfora.",
];

const OPTIONS = ["1", "2", "3", "4", "0"];
const COMMENT_PROMPTS = [
  "Describa la mayor fortaleza del estudiante en esta área (y contexto en que se manifiesta)",
  "Describa la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)",
  "Síntesis: Señale el desempeño general del estudiante en esta área",
  "Observaciones (señale aspectos o antecedentes no considerados o que usted crea importante relevar o complementar)",
];

export default function HabilidadesCognitivas() {
  return (
    <div className="container mb-4">
      <div className="border rounded p-4 bg-white">
        <h4 className="text-uppercase fw-bold mb-3">V. Habilidades cognitivas*</h4>
        <div className="table-responsive mb-4">
          <table className="table table-bordered table-sm align-middle">
            <thead className="table-light text-center">
              <tr>
                <th style={{ width: "40px" }}>N°</th>
                <th className="text-start">Indicador</th>
                <th>S<br /><small>(1)</small></th>
                <th>G<br /><small>(2)</small></th>
                <th>O<br /><small>(3)</small></th>
                <th>N<br /><small>(4)</small></th>
                <th>NO<br /><small>(0)</small></th>
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((texto, index) => {
                const name = `cognitivo_${index + 1}`;
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
        <section className="row g-3">
          {COMMENT_PROMPTS.map((label) => (
            <div className="col-12" key={label}>
              <label className="form-label">{label}</label>
              <textarea className="form-control" rows={label.includes("Síntesis") ? 2 : 3} />
            </div>
          ))}
        </section>
        <small className="text-muted d-block mt-3">* Considere edad y curso de referencia.</small>
      </div>
    </div>
  );
}
