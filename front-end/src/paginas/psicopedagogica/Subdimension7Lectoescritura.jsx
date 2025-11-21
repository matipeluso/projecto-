import React from "react";

function Subdimension7Lectoescritura({ items, onChange, onAdd, onRemove }) {
  return (
    <div className="card mb-3">
      <div className="card-header">Subdimensión 7: Lectoescritura</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Área</th>
              <th>Descripción</th>
              <th>Valor</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="area"
                    value={item.area || ""}
                    onChange={(e) => onChange(idx, "area", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    value={item.descripcion || ""}
                    onChange={(e) => onChange(idx, "descripcion", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="valor"
                    value={item.valor || 0}
                    onChange={(e) => onChange(idx, "valor", e.target.value)}
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
          Agregar ítem
        </button>
      </div>
    </div>
  );
}

export default Subdimension7Lectoescritura;
