import React from "react";

function TablaSubsectores({ subsectores, onChange, onAdd, onRemove }) {
  return (
    <div className="card mb-3">
      <div className="card-header">Subsectores</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Subsector</th>
              <th>Tipo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {subsectores.map((sub, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="subsector"
                    value={sub.subsector || ""}
                    onChange={(e) => onChange(idx, "subsector", e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    name="tipo"
                    value={sub.tipo || ""}
                    onChange={(e) => onChange(idx, "tipo", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    <option value="destacado">Destacado</option>
                    <option value="dificultad">Dificultad</option>
                  </select>
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
          Agregar Subsector
        </button>
      </div>
    </div>
  );
}

export default TablaSubsectores;
