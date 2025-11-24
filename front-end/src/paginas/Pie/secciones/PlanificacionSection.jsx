import React from "react";

/**
 * PlanificacionPIE (models.PlanificacionPIE - OneToOne)
 * Campos: descripcion_curso, fortalezas, necesidades_apoyo, estrategias_generales, recursos_apoyo, observaciones
 */
export default function PlanificacionSection({ registroId, value, setValue, onSave }) {
  const onChange = (e) => setValue({ ...value, [e.target.name]: e.target.value });

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Planificación del Proceso Educativo</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onSave({ ...value, registro: registroId })}
        >
          Guardar sección
        </button>
      </div>

      <form className="row g-3" onChange={onChange}>
        <div className="col-12">
          <label className="form-label">Descripción del curso</label>
          <textarea name="descripcion_curso" className="form-control" rows={3} value={value.descripcion_curso} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Fortalezas</label>
          <textarea name="fortalezas" className="form-control" rows={3} value={value.fortalezas} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Necesidades de apoyo</label>
          <textarea name="necesidades_apoyo" className="form-control" rows={3} value={value.necesidades_apoyo} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Estrategias generales</label>
          <textarea name="estrategias_generales" className="form-control" rows={3} value={value.estrategias_generales} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Recursos de apoyo</label>
          <textarea name="recursos_apoyo" className="form-control" rows={3} value={value.recursos_apoyo} />
        </div>
        <div className="col-12">
          <label className="form-label">Observaciones</label>
          <textarea name="observaciones" className="form-control" rows={3} value={value.observaciones} />
        </div>
      </form>
    </section>
  );
}
