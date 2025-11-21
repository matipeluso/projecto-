import React from "react";

function TablaEstrategias({ estrategias, onChange, onAdd, onRemove }) {
  return (
    <div className="card mb-3">
      <div className="card-header">Estrategias de Apoyo</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Aplicada</th>
              <th>Exitosa</th>
              <th>Número</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {estrategias.map((est, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    value={est.descripcion || ""}
                    onChange={(e) => onChange(idx, "descripcion", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="aplicada"
                    checked={!!est.aplicada}
                    onChange={(e) => onChange(idx, "aplicada", e.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="exitosa"
                    checked={!!est.exitosa}
                    onChange={(e) => onChange(idx, "exitosa", e.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="numero"
                    value={est.numero || 0}
                    onChange={(e) => onChange(idx, "numero", e.target.value)}
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
          Agregar Estrategia
        </button>
      </div>
    </div>
  );
}

export default TablaEstrategias;
