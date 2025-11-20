// src/paginas/Anamnesis/secciones/ObservacionesGeneralesSection.jsx
import React from "react";

export default function ObservacionesGeneralesSection({ value, setValue, onSave }) {
  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">8. Observaciones Generales</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>
      <div className="card-body">
        <textarea
          className="form-control"
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Registre observaciones generales…"
        />
        <p className="text-muted mt-2 mb-0">
          Los datos contenidos en este documento son confidenciales; su divulgación o uso indebido es penado por la ley.
        </p>
      </div>
    </section>
  );
}