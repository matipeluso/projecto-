import React from "react";
import { ESTRATEGIAS_CATALOG } from "./catalogos";

const INSTRUCTIONS = [
  "Se sugiere que esta pauta sea completada por el profesor/a jefe con apoyo de otros profesionales, si corresponde.",
  "Marque con una equis (✘) en la primera columna los apoyos específicos que se han entregado de forma exclusiva y complementaria al estudiante.",
  "Adjunte evidencias de los apoyos que ha seleccionado.",
  "Señale cuáles de estas estrategias seleccionadas han resultado exitosas (✔) para el alumno o alumna.",
];

function EstrategiasTable({ values = {}, onToggle, onDetalle, disabled }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle mb-0">
        <thead className="table-light text-center">
          <tr>
            <th style={{ width: "50px" }}>✘</th>
            <th style={{ width: "50px" }}>✔</th>
            <th className="text-start">Estrategias</th>
          </tr>
        </thead>
        <tbody>
          {ESTRATEGIAS_CATALOG.map((item) => {
            const estado = values[item.numero] || { aplicada: false, exitosa: false, detalle: "" };
            return (
              <tr key={item.numero}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={estado.aplicada}
                    disabled={disabled}
                    onChange={(event) => onToggle?.(item.numero, "aplicada", event.target.checked)}
                    aria-label={`Apoyo entregado: ${item.descripcion}`}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={estado.exitosa}
                    disabled={disabled}
                    onChange={(event) => onToggle?.(item.numero, "exitosa", event.target.checked)}
                    aria-label={`Estrategia exitosa: ${item.descripcion}`}
                  />
                </td>
                <td>
                  <span className="fw-semibold me-2">{item.numero}.</span>
                  {item.descripcion}
                  {item.requiereDetalle && (
                    <textarea
                      className="form-control mt-2"
                      rows={2}
                      placeholder="Detalle la estrategia aplicada"
                      value={estado.detalle}
                      disabled={disabled}
                      onChange={(event) => onDetalle?.(item.numero, event.target.value)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function EstrategiasApoyo({ values, onToggle, onDetalle, disabled = false }) {
  return (
    <div className="bg-white py-4">
      <div className="container">
        <div className="border rounded p-4 shadow-sm">
          <header className="mb-3">
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-3">
              <div>
                <p className="text-uppercase small mb-0">Ley 20.201 – Decreto 170/2009</p>
                <p className="text-uppercase small mb-1">
                  Evaluación Psicopedagógica y Curricular (Detección de NEE)
                </p>
              </div>
              <div className="bg-warning px-3 py-2 text-uppercase fw-bold rounded">
                D. Estrategias de apoyo utilizadas
              </div>
            </div>
            <p>
              La presente pauta tiene como propósito identificar los apoyos que se han otorgado previamente al
              estudiante, antes que él o los profesionales educativos decidan proceder a la evaluación diagnóstica
              integral.
            </p>
            <p>
              Los apoyos que se presentan corresponden a estrategias que los docentes utilizan habitualmente con
              todos sus estudiantes para responder a los diferentes estilos y ritmos de aprendizaje que estos
              presentan. No obstante, para aquellos estudiantes que han presentado algún tipo de dificultad en el
              proceso educativo, estas estrategias se aplican de forma sostenida, dirigida y específica.
            </p>
          </header>

          <section className="mb-4">
            <h6 className="fw-bold text-uppercase">Sugerencias de aplicación:</h6>
            <ol className="mb-0">
              {INSTRUCTIONS.map((texto) => (
                <li key={texto} className="mb-1">
                  {texto}
                </li>
              ))}
            </ol>
          </section>

          <EstrategiasTable
            values={values}
            onToggle={onToggle}
            onDetalle={onDetalle}
            disabled={disabled}
          />

          <footer className="text-muted small text-center mt-3">
            Los datos de este documento son confidenciales; su divulgación o uso indebido será penado por la ley.
          </footer>
        </div>
      </div>
    </div>
  );
}
