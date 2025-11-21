import React from "react";

function TablaApoyosAdicionales({ apoyos, onChange, onAdd, onRemove }) {
  return (
    <div className="card mb-3">
      <div className="card-header">Apoyos Adicionales</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Apoyo</th>
              <th>Recibido</th>
              <th>Descripción Extra</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {apoyos.map((ap, idx) => (
              <tr key={idx}>
                <td>
                  <select
                    className="form-select"
                    name="tipo"
                    value={ap.tipo || ""}
                    onChange={(e) => onChange(idx, "tipo", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    <option value="interno">Interno</option>
                    <option value="externo">Externo</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="apoyo"
                    value={ap.apoyo || ""}
                    onChange={(e) => onChange(idx, "apoyo", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="recibido"
                    checked={!!ap.recibido}
                    onChange={(e) => onChange(idx, "recibido", e.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion_extra"
                    value={ap.descripcion_extra || ""}
                    onChange={(e) => onChange(idx, "descripcion_extra", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemove(idx)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          Agregar Apoyo
        </button>
      </div>
    </div>
  );
}

export default TablaApoyosAdicionales;
