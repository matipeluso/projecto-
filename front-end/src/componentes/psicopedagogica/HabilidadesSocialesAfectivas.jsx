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

export default function HabilidadesSocialesAfectivas() {
  return (
    <div className="container mb-4">
      <div className="border rounded p-4 bg-white">
        <h4 className="text-uppercase fw-bold mb-3">II. Habilidades sociales y afectivas*</h4>
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
        <section className="row g-3">
          {[
            "Describa la mayor fortaleza del estudiante en esta área (y contexto en que se manifiesta)",
            "Describa la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)",
            "Síntesis: Señale el desempeño general del estudiante en esta área",
            "Observaciones (señale aspectos o antecedentes no considerados o que usted crea importante relevar o complementar)",
          ].map((label) => (
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
