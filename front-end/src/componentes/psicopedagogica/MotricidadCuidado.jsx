import React from "react";

const ITEMS = [
  "Se desplaza con coordinación y equilibrio.",
  "Combina diferentes movimientos y posturas al desplazarse.",
  "Corre con fluidez, variando la velocidad, la dirección y el tipo de desplazamiento.",
  "En actividades motrices, mantiene la coordinación y control dinámico de su cuerpo.",
  "Ejecuta movimientos de manipulación que requieren control muscular fino.",
  "Efectúa trabajos grafo-motores con precisión y seguridad en los trazos.",
  "Manipula objetos y herramientas con precisión.",
  "Realiza ejercicios que requieren esfuerzo físico sostenido.",
  "Realiza en forma autónoma prácticas de autocuidado e higiene corporal.",
  "Cuida y guarda sus pertenencias.",
  "Manifiesta iniciativa en el cuidado y bienestar personal.",
  "Identifica situaciones u objetos que son riesgosos para su seguridad.",
  "Presenta automatismos o movimientos reiterativos como balanceo, movimientos de manos, etc.",
];

const OPTIONS = ["1", "2", "3", "4", "0"];

export default function MotricidadCuidado() {
  return (
    <div className="container mb-4">
      <div className="border rounded p-4 bg-white">
        <h4 className="text-uppercase fw-bold mb-3">III. Motricidad y cuidado de sí mismo*</h4>
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
                const name = `motricidad_${index + 1}`;
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
