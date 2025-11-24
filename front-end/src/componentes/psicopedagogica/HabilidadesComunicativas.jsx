import React from "react";

const ITEMS = [
  "Se comunica e interactúa con los demás de manera espontánea.",
  "Se comunica e interactúa con los demás de manera guiada.",
  "Participa en conversaciones con sus pares y/o adultos de forma espontánea.",
  "La pronunciación, orden y estructura gramatical de sus expresiones verbales/en lengua de señas favorecen la comprensión del mensaje.",
  "Utiliza oraciones completas en intervenciones orales/en lengua de señas.",
  "Relata en forma secuenciada y clara experiencias personales.",
  "Realiza y cumple instrucciones entregadas oralmente/en lengua de señas.",
  "Ajusta su lenguaje a diversos contextos e interlocutores.",
  "Su expresión oral es rítmica y con una melodía; su expresión manual es rítmica, con fluidez de señalización, y coherente con la expresión facial y corporal (prosodia).",
  "Utiliza palabras/señas y conceptos rebuscados.",
  "El volumen de su voz/claridad en la señalización, se ajusta a las diversas situaciones y/o contextos.",
  "Conoce y usa un vocabulario amplio.",
  "Comunica sensaciones, experiencias, emociones, necesidades e ideas a través del lenguaje oral/lengua de señas.",
  "Repite frecuentemente palabras/señas u oraciones (ecolalia).",
];

const OPTIONS = ["1", "2", "3", "4", "0"];

export default function HabilidadesComunicativas() {
  return (
    <div className="container mb-4">
      <div className="border rounded p-4 bg-white">
        <h4 className="text-uppercase fw-bold mb-3">I. Habilidades comunicativas*</h4>
        <div className="table-responsive mb-4">
          <table className="table table-bordered table-sm align-middle">
            <thead className="table-light text-center">
              <tr>
                <th style={{ width: "40px" }}>N°</th>
                <th className="text-start">Descripción del ítem</th>
                <th>S<br /><small>(1)</small></th>
                <th>G<br /><small>(2)</small></th>
                <th>O<br /><small>(3)</small></th>
                <th>N<br /><small>(4)</small></th>
                <th>NO<br /><small>(0)</small></th>
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((texto, index) => {
                const name = `comunicacion_${index + 1}`;
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
