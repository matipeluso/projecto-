// src/paginas/Anamnesis/secciones/DefinicionProblemaSection.jsx
import React from "react";

export default function DefinicionProblemaSection({ value, setValue, onSave }) {
  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">4. Definición del problema o situación que motiva la entrevista</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>
      <div className="card-body">
        <textarea
          className="form-control"
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describa la situación que motiva la entrevista…"
        />
      </div>
    </section>
  );
}