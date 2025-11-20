// src/paginas/Anamnesis/secciones/AntecedentesFamiliaSection.jsx
import React from "react";

export default function AntecedentesFamiliaSection({ value, setValue, onSave, onDelete }) {
  const add = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const nuevo = {
      id: `temp-${Date.now()}`,
      nombre: f.nombre.value.trim(),
      parentesco: f.parentesco.value.trim(),
      edad: f.edad.value.trim(),
      escolaridad: f.escolaridad.value.trim(),
      ocupacion: f.ocupacion.value.trim(),
    };
    setValue({ ...value, convivientes: [...value.convivientes, nuevo] });
    f.reset();
  };

  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">6. Antecedentes Familiares</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Parentesco</th>
                <th>Edad</th>
                <th>Escolaridad</th>
                <th>Ocupación</th>
                <th style={{width:120}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {value.convivientes.length === 0 && (
                <tr><td colSpan={6} className="text-center text-muted">Sin registros</td></tr>
              )}
              {value.convivientes.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.parentesco}</td>
                  <td>{p.edad}</td>
                  <td>{p.escolaridad}</td>
                  <td>{p.ocupacion}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-danger" onClick={() => onDelete(p.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form agregar conviviente */}
        <form className="row g-3 mt-2" onSubmit={add}>
          <div className="col-md-2">
            <label className="form-label">Nombre</label>
            <input className="form-control" name="nombre" required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Parentesco</label>
            <input className="form-control" name="parentesco" required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Edad</label>
            <input className="form-control" name="edad" required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Escolaridad</label>
            <input className="form-control" name="escolaridad" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Ocupación</label>
            <input className="form-control" name="ocupacion" />
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-success btn-sm" type="submit">Agregar</button>
          </div>
        </form>

        <div className="row g-3 mt-2">
          <div className="col-12">
            <label className="form-label">Antecedentes de Salud de la Familia</label>
            <textarea className="form-control" rows={3} value={value.salud_familia} onChange={(e) => setValue({ ...value, salud_familia: e.target.value })} />
          </div>
          <div className="col-12">
            <label className="form-label">Observaciones</label>
            <textarea className="form-control" rows={3} value={value.observaciones} onChange={(e) => setValue({ ...value, observaciones: e.target.value })} />
          </div>
        </div>
      </div>
    </section>
  );
}