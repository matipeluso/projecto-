import React from "react";
import { APOYOS_INTERNOS, APOYOS_EXTERNOS } from "./catalogos";

function ApoyoTable({ title, rows, values, onRecibido, onDescripcion, disabled, namePrefix }) {
  return (
    <table className="table table-bordered align-middle">
      <thead className="table-light text-center">
        <tr>
          <th colSpan={3}>{title}</th>
        </tr>
        <tr>
          <th>Recurso / profesional</th>
          <th>SI</th>
          <th>NO</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const estado = values[row.id] || { recibido: null, descripcion_extra: "" };
          const name = `${namePrefix}-${row.id}`;
          return (
            <tr key={row.id}>
              <td>
                {row.label}
                {row.requiereDescripcion && estado.recibido && (
                  <textarea
                    className="form-control mt-2"
                    rows={2}
                    placeholder="Detalle el apoyo"
                    value={estado.descripcion_extra || ""}
                    disabled={disabled}
                    onChange={(event) => onDescripcion?.(row.id, event.target.value)}
                  />
                )}
              </td>
              <td className="text-center">
                <input
                  type="radio"
                  name={name}
                  className="form-check-input"
                  checked={estado.recibido === true}
                  disabled={disabled}
                  onChange={() => onRecibido?.(row.id, true)}
                  aria-label={`Recibe ${row.label}`}
                />
              </td>
              <td className="text-center">
                <input
                  type="radio"
                  name={name}
                  className="form-check-input"
                  checked={estado.recibido === false}
                  disabled={disabled}
                  onChange={() => onRecibido?.(row.id, false)}
                  aria-label={`No recibe ${row.label}`}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function ApoyosAdicionales({ values = {}, onRecibido, onDescripcion, disabled = false }) {
  return (
    <div className="bg-white py-4">
      <div className="container">
        <div className="border rounded p-4 shadow-sm">
          <header className="mb-3">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
              <div>
                <p className="text-uppercase small mb-0">Ley 20.201 – Decreto 170/2009</p>
                <p className="text-uppercase small mb-1">
                  Evaluación Psicopedagógica y Curricular (Detección de NEE)
                </p>
              </div>
              <div className="bg-warning px-3 py-2 text-uppercase fw-bold rounded">
                E. Apoyos adicionales
              </div>
            </div>
            <p className="mb-2">
              En atención a sus dificultades, el alumno(a) requiere o ha requerido de algún recurso o Apoyo Especial,
              que es adicional y distinto al tipo de apoyo en el aula que habitualmente ofrece la Escuela a los
              estudiantes de la misma edad y curso.
            </p>
          </header>
          <div className="row g-3">
            <div className="col-md-6">
              <ApoyoTable
                title="En la escuela (jardín, colegio, liceo)"
                rows={APOYOS_INTERNOS}
                values={values}
                onRecibido={onRecibido}
                onDescripcion={onDescripcion}
                disabled={disabled}
                namePrefix="interno"
              />
            </div>
            <div className="col-md-6">
              <ApoyoTable
                title="Apoyo externo (hogar, centro asistencial)"
                rows={APOYOS_EXTERNOS}
                values={values}
                onRecibido={onRecibido}
                onDescripcion={onDescripcion}
                disabled={disabled}
                namePrefix="externo"
              />
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
