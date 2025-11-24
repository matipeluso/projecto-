import React from "react";

const ITEMS = [
  "Responde cuando se le habla con volumen de voz natural.",
  "Repite las rimas, canciones, refranes, dichos que se le enseñan.",
  "Responde a mensajes orales simples.",
  "Identifica y localiza la fuente de sonido en el medio ambiente.",
  "En conversaciones grupales espontáneas, mira o atiende hacia la persona que habla.",
  "Se expresa a través de actividades musicales.",
  "Se expresa a través de actividades plásticas.",
  "En actividades que requieren del uso de lectura y escritura necesita acercarse a los textos o al pizarrón.",
  "Se desplaza evitando obstáculos presentes en el trayecto.",
  "Distingue imágenes, textos, colores.",
  "Responde a gestos o señas comunicativas de otros.",
];

const OPTIONS = ["1", "2", "3", "4", "0"];
const COMMENT_PROMPTS = [
  "Describa la mayor fortaleza del estudiante en esta área (y contexto en que se manifiesta)",
  "Describa la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)",
  "Síntesis: Señale el desempeño general del estudiante en esta área",
  "Observaciones (señale aspectos o antecedentes no considerados o que usted crea importante relevar o complementar)",
];

export default function CapacidadesSensoperceptivas() {
  return (
    <div className="container mb-4">
      <div className="border rounded p-4 bg-white">
        <h4 className="text-uppercase fw-bold mb-3">VI. Capacidades sensoperceptivas*</h4>
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
                const name = `sensoperceptiva_${index + 1}`;
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
