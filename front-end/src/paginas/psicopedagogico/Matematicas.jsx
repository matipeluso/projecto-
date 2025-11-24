import React from "react";

const ITEMS = [
  "Ordena objetos de menor a mayor y viceversa.",
  "Agrupa y clasifica objetos.",
  "Asocia los símbolos numéricos a una cantidad.",
  "Comprende que la posición de un número determina su valor.",
  "Lee y escribe números.",
  "Realiza la operación que corresponde a partir de signos matemáticos.",
  "Realiza cálculos escritos en operaciones matemáticas.",
  "Realiza cálculos mentales en operaciones matemáticas.",
  "Asocia objetos del entorno a formas geométricas.",
  "Ubica posiciones y trayectorias en el espacio considerando una ubicación concreta.",
  "Resuelve problemas matemáticos a nivel de su curso.",
];

const OPTIONS = ["1", "2", "3", "4", "0"];

function Matematicas() {
  return (
    <div className="container my-4">
      <div className="border rounded p-4 bg-white">
        <header className="text-center mb-4">
          <p className="mb-1 text-uppercase small">Ley 20.201 – Decreto 170/2009</p>
          <h3 className="fw-bold text-uppercase mb-2">Evaluación Psicopedagógica y Curricular</h3>
          <p className="fw-semibold text-primary">VIII.- Matemáticas*</p>
        </header>

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
                const name = `matematicas_${index + 1}`;
                return (
                  <tr key={name}>
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td>{texto}</td>
                    {OPTIONS.map((valor) => (
                      <td key={`${name}-${valor}`} className="text-center">
                        <input
                          type="radio"
                          name={name}
                          value={valor}
                          className="form-check-input"
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <section className="row g-3">
          <div className="col-12">
            <label className="form-label">
              Describa la mayor fortaleza del estudiante en esta área (y contexto en que se manifiesta)
            </label>
            <textarea className="form-control" rows="3" />
          </div>
          <div className="col-12">
            <label className="form-label">
              Describa la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)
            </label>
            <textarea className="form-control" rows="3" />
          </div>
          <div className="col-12">
            <label className="form-label">Síntesis: Señale el desempeño general del estudiante en esta área</label>
            <textarea className="form-control" rows="2" />
          </div>
          <div className="col-12">
            <label className="form-label">
              Observaciones (señale aspectos o antecedentes no considerados o que usted crea importante relevar o complementar)
            </label>
            <textarea className="form-control" rows="2" />
          </div>
        </section>

        <small className="text-muted d-block mt-3">* Considere edad y curso de referencia.</small>
      </div>
    </div>
  );
}

export default Matematicas;
