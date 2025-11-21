// src/paginas/Anamnesis/secciones/IdentificacionEstudianteSection.jsx
import React from "react";

export default function IdentificacionEstudianteSection({ value, setValue, onSave }) {
  const set = (k, v) => setValue({ ...value, [k]: v });
  const setG = (grp, k, v) => setValue({ ...value, [grp]: { ...value[grp], [k]: v } });

  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">1. Identificación del Estudiante</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input className="form-control" value={value.nombre} onChange={(e) => set("nombre", e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label d-block">Sexo</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sexo" id="sexoF" checked={value.sexo === "F"} onChange={() => set("sexo", "F")} />
                <label className="form-check-label" htmlFor="sexoF">F</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sexo" id="sexoM" checked={value.sexo === "M"} onChange={() => set("sexo", "M")} />
                <label className="form-check-label" htmlFor="sexoM">M</label>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Fecha Nacimiento</label>
            <input type="date" className="form-control" value={value.fecha_nacimiento} onChange={(e) => set("fecha_nacimiento", e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Edad actual</label>
            <div className="input-group">
              <input className="form-control" placeholder="años" value={value.edad_anios} onChange={(e) => set("edad_anios", e.target.value)} />
              <span className="input-group-text">años</span>
              <input className="form-control" placeholder="meses" value={value.edad_meses} onChange={(e) => set("edad_meses", e.target.value)} />
              <span className="input-group-text">meses</span>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">País natal</label>
            <input className="form-control" value={value.pais_natal} onChange={(e) => set("pais_natal", e.target.value)} />
          </div>

          <div className="col-md-8">
            <label className="form-label">Domicilio actual</label>
            <input className="form-control" value={value.domicilio} onChange={(e) => set("domicilio", e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Teléfono</label>
            <input className="form-control" value={value.telefono} onChange={(e) => set("telefono", e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Lengua materna</label>
            <input className="form-control" value={value.lengua_materna} onChange={(e) => set("lengua_materna", e.target.value)} />
            <div className="mt-2 d-flex flex-wrap gap-3">
              {["comprende","habla","lee","escribe"].map((k) => (
                <div className="form-check" key={k}>
                  <input className="form-check-input" type="checkbox" id={`materna-${k}`} checked={value.grado_materna[k]} onChange={(e) => setG("grado_materna", k, e.target.checked)} />
                  <label className="form-check-label" htmlFor={`materna-${k}`}>{k}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Lengua de uso</label>
            <input className="form-control" value={value.lengua_uso} onChange={(e) => set("lengua_uso", e.target.value)} />
            <div className="mt-2 d-flex flex-wrap gap-3">
              {["comprende","habla","lee","escribe"].map((k) => (
                <div className="form-check" key={k}>
                  <input className="form-check-input" type="checkbox" id={`uso-${k}`} checked={value.grado_uso[k]} onChange={(e) => setG("grado_uso", k, e.target.checked)} />
                  <label className="form-check-label" htmlFor={`uso-${k}`}>{k}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Escolaridad actual</label>
            <input className="form-control" value={value.escolaridad_actual} onChange={(e) => set("escolaridad_actual", e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Establecimiento</label>
            <input className="form-control" value={value.establecimiento} onChange={(e) => set("establecimiento", e.target.value)} />
          </div>
        </div>
      </div>
    </section>
  );
}