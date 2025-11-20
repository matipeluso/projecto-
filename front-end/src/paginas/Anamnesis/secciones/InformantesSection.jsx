// src/paginas/Anamnesis/secciones/InformantesSection.jsx
import React from "react";

export default function InformantesSection({ items, setItems, onSave, onDelete }) {
  const add = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const nuevo = {
      id: `temp-${Date.now()}`,
      fecha_entrevista: f.fecha_entrevista.value,
      nombre: f.nombre.value.trim(),
      relacion_estudiante: f.relacion_estudiante.value.trim(),
      presencia: f.presencia.value.trim(),
    };
    setItems((prev) => [...prev, nuevo]);
    f.reset();
  };

  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">2. Informantes</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead>
              <tr>
                <th>Fecha entrevista</th>
                <th>Nombre</th>
                <th>Relación</th>
                <th>En presencia de</th>
                <th style={{width:120}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={5} className="text-center text-muted">Sin registros</td></tr>
              )}
              {items.map((it) => (
                <tr key={it.id}>
                  <td>{it.fecha_entrevista}</td>
                  <td>{it.nombre}</td>
                  <td>{it.relacion_estudiante}</td>
                  <td>{it.presencia}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-danger" onClick={() => onDelete(it.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form agregar */}
        <form className="row g-3 mt-2" onSubmit={add}>
          <div className="col-md-3">
            <label className="form-label">Fecha de la entrevista</label>
            <input type="date" name="fecha_entrevista" className="form-control" required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Nombre</label>
            <input name="nombre" className="form-control" required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Relación con el/la estudiante</label>
            <input name="relacion_estudiante" className="form-control" required />
          </div>
          <div className="col-md-3">
            <label className="form-label">En presencia de</label>
            <input name="presencia" className="form-control" placeholder="Miembro familia / Intérprete / Otro" />
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-success btn-sm" type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </section>
  );
}