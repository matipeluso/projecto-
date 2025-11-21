import React from "react";

/**
 * ActividadComunidad (models.ActividadComunidad)
 * Campos: fecha, participantes, objetivos, resultados, observaciones
 */
export default function ActividadComunidadSection({ registroId, items, setItems, onSave, onDelete }) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Actividades con la Comunidad</h5>
        <button className="btn btn-primary btn-sm" onClick={() => onSave(items)}>
          Guardar sección
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Participantes</th>
              <th>Objetivos</th>
              <th>Resultados</th>
              <th>Observaciones</th>
              <th style={{ width: 140 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">No hay registros.</td>
              </tr>
            )}
            {items.map((a) => (
              <tr key={a.id}>
                <td>{a.fecha}</td>
                <td>{a.participantes}</td>
                <td>{a.objetivos}</td>
                <td>{a.resultados}</td>
                <td>{a.observaciones}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary">Editar</button>
                    <button className="btn btn-outline-danger" onClick={() => onDelete(a.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        className="row g-3 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const f = e.currentTarget;
          const nuevo = {
            id: Date.now(),
            fecha: f.fecha.value,
            participantes: f.participantes.value.trim(),
            objetivos: f.objetivos.value.trim(),
            resultados: f.resultados.value.trim(),
            observaciones: f.observaciones.value.trim(),
            registro: registroId ?? null,
          };
          setItems((prev) => [...prev, nuevo]);
          f.reset();
        }}
      >
        <div className="col-md-2">
          <label className="form-label">Fecha</label>
          <input type="date" name="fecha" className="form-control" required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Participantes</label>
          <input name="participantes" className="form-control" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Objetivos</label>
          <input name="objetivos" className="form-control" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Resultados</label>
          <input name="resultados" className="form-control" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Observaciones</label>
          <input name="observaciones" className="form-control" />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success btn-sm">Agregar</button>
        </div>
      </form>
    </section>
  );
}