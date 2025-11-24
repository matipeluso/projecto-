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
  "Repite frecuentemente palabras/señas u oraciones (ecolalia)."
];

export default function EvaluacionPsicoPage2() {
  return (
    <div className="container py-4">
      <section className="border rounded p-3 mb-4">
        <h5 className="fw-bold text-uppercase mb-3">I. Habilidades comunicativas</h5>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light text-center">
              <tr>
                <th style={{ width: "40px" }}>N°</th>
                <th className="text-start">Descripción del ítem</th>
                <th style={{ width: "60px" }}>S<br /><small>(1)</small></th>
                <th style={{ width: "60px" }}>G<br /><small>(2)</small></th>
                <th style={{ width: "60px" }}>O<br /><small>(3)</small></th>
                <th style={{ width: "60px" }}>N<br /><small>(4)</small></th>
                <th style={{ width: "70px" }}>NO<br /><small>(0)</small></th>
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((text, index) => {
                const rowName = `item-${index + 1}`;
                return (
                  <tr key={rowName}>
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td>{text}</td>
                    {["s", "g", "o", "n", "no"].map((opt) => (
                      <td key={`${rowName}-${opt}`} className="text-center">
                        <input type="radio" name={rowName} className="form-check-input" />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border rounded p-3 mb-4">
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Describe la mayor fortaleza del estudiante en esta área (y contexto en que se manifiesta)</label>
            <textarea className="form-control" rows="3" />
          </div>
          <div className="col-12">
            <label className="form-label">Describe la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)</label>
            <textarea className="form-control" rows="3" />
          </div>
          <div className="col-12">
            <label className="form-label">Síntesis: Señale el desempeño general del estudiante en esta área</label>
            <textarea className="form-control" rows="2" />
          </div>
          <div className="col-12">
            <label className="form-label">Observaciones (señale aspectos o antecedentes no considerados o que usted crea importante relevar o complementar)</label>
            <textarea className="form-control" rows="2" />
          </div>
        </div>
      </section>

      <section className="border rounded p-3">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre evaluador/a</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Firma</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </section>
    </div>
  );
}
