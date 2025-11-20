import React from "react";

/**
 * LogroAprendizaje (models.LogroAprendizaje)
 * Campos: estudiante(FK), fecha, logros, dificultades, estrategias_utilizadas, comentarios
 * Nota: En el front puedes ingresar RUN, pero para el backend envía estudiante: <id>
 */
export default function LogrosSection({ registroId, items, setItems, onSave, onDelete }) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Logros de Aprendizaje</h5>
        <button className="btn btn-primary btn-sm" onClick={() => onSave(items)}>
          Guardar sección
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th>RUN/Estudiante</th>
              <th>Fecha</th>
              <th>Logros</th>
              <th>Dificultades</th>
              <th>Estrategias utilizadas</th>
              <th>Comentarios</th>
              <th style={{ width: 140 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted">No hay registros.</td>
              </tr>
            )}
            {items.map((l) => (
              <tr key={l.id}>
                <td>{l.estudiante}</td>
                <td>{l.fecha}</td>
                <td>{l.logros}</td>
                <td>{l.dificultades}</td>
                <td>{l.estrategias_utilizadas}</td>
                <td>{l.comentarios}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary">Editar</button>
                    <button className="btn btn-outline-danger" onClick={() => onDelete(l.id)}>Eliminar</button>
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
            // En UI: RUN o nombre. Para backend: estudiante: <id>
            estudiante: f.estudiante.value.trim(),
            fecha: f.fecha.value,
            logros: f.logros.value.trim(),
            dificultades: f.dificultades.value.trim(),
            estrategias_utilizadas: f.estrategias_utilizadas.value.trim(),
            comentarios: f.comentarios.value.trim(),
            registro: registroId ?? null,
          };
          setItems((prev) => [...prev, nuevo]);
          f.reset();
        }}
      >
        <div className="col-md-2">
          <label className="form-label">RUN/Estudiante</label>
          <input name="estudiante" className="form-control" placeholder="12345678-9 o ID" required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Fecha</label>
          <input type="date" name="fecha" className="form-control" required />
        </div>
        <div className="col-md-2">
          <label className="form-label">Logros</label>
          <input name="logros" className="form-control" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Dificultades</label>
          <input name="dificultades" className="form-control" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Estrategias utilizadas</label>
          <input name="estrategias_utilizadas" className="form-control" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Comentarios</label>
          <input name="comentarios" className="form-control" />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success btn-sm">Agregar</button>
        </div>
      </form>
    </section>
  );
}