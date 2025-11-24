import React from "react";

/**
 * EvaluacionPIE (models.EvaluacionPIE - OneToOne)
 * Campos: fecha_evaluacion, resultados, conclusiones, proyecciones
 */
export default function EvaluacionSection({ registroId, value, setValue, onSave }) {
  const onChange = (e) => setValue({ ...value, [e.target.name]: e.target.value });

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Evaluación PIE</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onSave({ ...value, registro: registroId })}
        >
          Guardar sección
        </button>
      </div>

      <form className="row g-3" onChange={onChange}>
        <div className="col-md-3">
          <label className="form-label">Fecha de evaluación</label>
          <input type="date" name="fecha_evaluacion" className="form-control" value={value.fecha_evaluacion} />
        </div>
        <div className="col-12">
          <label className="form-label">Resultados</label>
          <textarea name="resultados" className="form-control" rows={3} value={value.resultados} />
        </div>
        <div className="col-12">
          <label className="form-label">Conclusiones</label>
          <textarea name="conclusiones" className="form-control" rows={3} value={value.conclusiones} />
        </div>
        <div className="col-12">
          <label className="form-label">Proyecciones</label>
          <textarea name="proyecciones" className="form-control" rows={3} value={value.proyecciones} />
        </div>
      </form>
    </section>
  );
}