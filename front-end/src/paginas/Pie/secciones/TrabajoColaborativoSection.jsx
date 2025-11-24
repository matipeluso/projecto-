import React from "react";

/**
 * TrabajoColaborativo (models.TrabajoColaborativo)
 * Campos: fecha, tipo, descripcion, observaciones
 */
export default function TrabajoColaborativoSection({ registroId, items, setItems, onSave, onDelete }) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Trabajo Colaborativo</h5>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => onSave(items)}>
          Guardar sección
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Observaciones</th>
              <th style={{ width: 140 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted">No hay registros.</td>
              </tr>
            )}
            {items.map((t) => (
              <tr key={t.id}>
                <td>{t.fecha}</td>
                <td>{t.tipo}</td>
                <td>{t.descripcion}</td>
                <td>{t.observaciones}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary">Editar</button>
                    <button className="btn btn-outline-danger" onClick={() => onDelete(t.id)}>Eliminar</button>
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
            id: `temp-${Date.now()}`,
            fecha: f.fecha.value,
            tipo: f.tipo.value,
            descripcion: f.descripcion.value.trim(),
            observaciones: f.observaciones.value.trim(),
            registro: registroId ?? null,
          };
          setItems((prev) => [...prev, nuevo]);
          f.reset();
        }}
      >
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input type="date" name="fecha" className="form-control" required />
        </div>
        <div className="col-md-3">
          <label className="form-label">Tipo</label>
          <select name="tipo" className="form-select" required>
            <option value="">Seleccione…</option>
            <option>Co-enseñanza</option>
            <option>Planificación compartida</option>
            <option>Reunión de equipo</option>
            <option>Trabajo con familia</option>
            <option>Trabajo con comunidad</option>
            <option>Otro</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Descripción</label>
          <input name="descripcion" className="form-control" />
        </div>
        <div className="col-md-3">
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