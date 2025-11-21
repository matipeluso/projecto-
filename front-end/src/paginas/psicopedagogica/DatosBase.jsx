import React from "react";

function DatosBase({ estudiante, evaluador, fecha, observaciones, onChange }) {
  return (
    <div className="card mb-3">
      <div className="card-header">Datos del Estudiante</div>
      <div className="card-body">
        <div className="mb-2">
          <label className="form-label">Estudiante</label>
          <input
            type="text"
            className="form-control"
            name="estudiante"
            value={estudiante || ""}
            onChange={onChange}
            required
            disabled
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Evaluador</label>
          <input
            type="text"
            className="form-control"
            name="evaluador"
            value={evaluador || ""}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={fecha || ""}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Observaciones</label>
          <textarea
            className="form-control"
            name="observaciones"
            value={observaciones || ""}
            onChange={onChange}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

export default DatosBase;
