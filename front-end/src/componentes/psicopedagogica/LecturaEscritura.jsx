import React from "react";

const ITEMS = [
  "Reconoce y diferencia diferentes tipos de textos.",
  "Describe lugares, hechos, personas o personajes de textos leídos.",
  "Extrae información de los textos leídos.",
  "Expresa su opinión sobre los textos leídos.",
  "Lee diversos tipos de textos sugeridos.",
  "Reconoce la correspondencia entre los sonidos y las letras.",
  "Identifica palabras a primera vista a partir de sus características gráficas.",
  "Identifica y reconoce las letras del alfabeto.",
  "Reproduce las letras del alfabeto.",
  "Da forma a las letras y las liga para construir palabras en sus textos escritos.",
  "Segmenta palabras y oraciones.",
  "Escribe textos siguiendo una secuencia.",
  "Produce textos con diferentes propósitos.",
];

const OPTIONS = ["1", "2", "3", "4", "0"];
const COMMENT_PROMPTS = [
  "Describa la mayor fortaleza del estudiante en esta área (y contexto en que se manifiesta)",
  "Describa la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)",
  "Síntesis: Señale el desempeño general del estudiante en esta área",
  "Observaciones (señale aspectos o antecedentes no considerados o que usted crea importante relevar o complementar)",
];

export default function LecturaEscritura() {
  return (
    <div className="container mb-4">
      <div className="border rounded p-4 bg-white">
        <h4 className="text-uppercase fw-bold mb-3">VII. Lectura y escritura*</h4>
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
                const name = `lectura_${index + 1}`;
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
