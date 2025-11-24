import React from "react";
import { SUBSECTOR_SECTIONS } from "./catalogos";

const LEFT_COLUMNS = ["Educación Parvularia", "Educación Media"];

function SubsectorTable({ title, items, values, onToggle, disabled }) {
  return (
    <div className="mb-4">
      <div className="bg-warning text-uppercase fw-semibold px-3 py-2 rounded-top">
        {title}
      </div>
      <table className="table table-bordered table-sm mb-0">
        <thead className="table-light text-center">
          <tr>
            <th style={{ width: "60px" }}>✔</th>
            <th style={{ width: "60px" }}>✘</th>
            <th className="text-start">Subsector</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const estado = values[item.id] || { destacado: false, dificultad: false };
            return (
              <tr key={item.id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={estado.destacado}
                    disabled={disabled}
                    onChange={(event) => onToggle?.(item.id, "destacado", event.target.checked)}
                    aria-label={`Destacado en ${item.label}`}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={estado.dificultad}
                    disabled={disabled}
                    onChange={(event) => onToggle?.(item.id, "dificultad", event.target.checked)}
                    aria-label={`Dificultad en ${item.label}`}
                  />
                </td>
                <td>{item.label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Subsectores({ values = {}, onToggle, disabled = false }) {
  return (
    <div className="bg-white py-4">
      <div className="container">
        <div className="border rounded p-4 shadow-sm">
          <header className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <p className="text-uppercase small mb-0">Ley 20.201 – Decreto 170/2009</p>
                <p className="text-uppercase small mb-0">
                  Evaluación Psicopedagógica y Curricular (Detección de NEE)
                </p>
              </div>
              <div className="bg-danger text-white px-3 py-2 fw-bold rounded">
                C. Subsectores
              </div>
            </div>
            <p className="mb-0">
              Señale con (✔) el o los subsectores en los que el/la estudiante se destaca, y con una (✘)
              aquellos en los que presenta dificultad:
            </p>
          </header>

          <div className="row g-4">
            <div className="col-md-6">
              {SUBSECTOR_SECTIONS.filter((section) => LEFT_COLUMNS.includes(section.title)).map((section) => (
                <SubsectorTable
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  values={values}
                  onToggle={onToggle}
                  disabled={disabled}
                />
              ))}
            </div>
            <div className="col-md-6">
              {SUBSECTOR_SECTIONS.filter((section) => !LEFT_COLUMNS.includes(section.title)).map((section) => (
                <SubsectorTable
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  values={values}
                  onToggle={onToggle}
                  disabled={disabled}
                />
              ))}
            </div>
          </div>

          <footer className="text-muted small text-center mt-3">
            Los datos de este documento son confidenciales; su divulgación o uso indebido será penado por la ley.
          </footer>
        </div>
      </div>
    </div>
  );
}
