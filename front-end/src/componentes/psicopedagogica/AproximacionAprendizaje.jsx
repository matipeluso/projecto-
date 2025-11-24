import React from "react";

const ITEMS = [
  "Muestra preferencias e intereses diversos.",
  "Se muestra activo e interesado por su entorno.",
  "Se concentra en las actividades y acciones de la clase.",
  "Mantiene atención sostenida al trabajar solo.",
  "Mantiene atención sostenida al trabajar con otros.",
  "Persiste en los trabajos y tareas hasta concluirlos.",
  "Concluye los trabajos de forma ordenada. Es sistemático en la realización de su trabajo.",
  "A partir de las instrucciones desarrolla su trabajo de manera autónoma.",
  "Prefiere trabajar solo/a.",
  "Trabaja mejor en colaboración con otros/as.",
  "Le gusta resolver problemas.",
  "Emprende con entusiasmo tareas nuevas.",
  "Le gusta la experimentación.",
  "Es competitivo/a.",
  "Es creativo/a.",
];

const OPTIONS = ["1", "2", "3", "4", "0"];

export default function AproximacionAprendizaje() {
  return (
    <div className="container mb-4">
      <div className="border rounded p-4 bg-white">
        <h4 className="text-uppercase fw-bold mb-3">IV. Aproximación al aprendizaje*</h4>
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
                const name = `aprendizaje_${index + 1}`;
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
