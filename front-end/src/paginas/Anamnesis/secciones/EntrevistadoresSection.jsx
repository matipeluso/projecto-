// src/paginas/Anamnesis/secciones/EntrevistadoresSection.jsx
import React from "react";

export default function EntrevistadoresSection({ items, setItems, onSave, onDelete }) {
  const add = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const nuevo = {
      id: `temp-${Date.now()}`,
      fecha_entrevista: f.fecha_entrevista.value,
      nombre: f.nombre.value.trim(),
      rol_cargo: f.rol_cargo.value.trim(),
    };
    setItems((prev) => [...prev, nuevo]);
    f.reset();
  };

  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">3. Entrevistadores</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead>
              <tr>
                <th>Fecha entrevista</th>
                <th>Nombre</th>
                <th>Rol/Cargo</th>
                <th style={{width:120}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={4} className="text-center text-muted">Sin registros</td></tr>
              )}
              {items.map((it) => (
                <tr key={it.id}>
                  <td>{it.fecha_entrevista}</td>
                  <td>{it.nombre}</td>
                  <td>{it.rol_cargo}</td>
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
            <label className="form-label">Rol/Cargo</label>
            <input name="rol_cargo" className="form-control" />
          </div>
          <div className="col-md-3 d-flex align-items-end justify-content-end">
            <button className="btn btn-success btn-sm" type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </section>
  );
}