import React from "react";

export default function EvaluacionPsicoPage1() {
  return (
    <div className="container py-4">
      {/* Identificación del estudiante */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold text-uppercase mb-3">Identificación del estudiante</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha nacimiento</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">País natal</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row g-3 mt-1">
          <div className="col-md-4">
            <label className="form-label">Edad actual (años)</label>
            <input type="number" min="0" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Edad actual (meses)</label>
            <input type="number" min="0" max="11" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Domicilio</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Lengua materna</label>
            <div className="table-responsive">
              <table className="table table-bordered mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Grado dominio</th>
                    <th>Comprende</th>
                    <th>Habla</th>
                    <th>Lee</th>
                    <th>Escribe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select className="form-select">
                        <option value="">Seleccione</option>
                        <option value="alto">Alto</option>
                        <option value="medio">Medio</option>
                        <option value="bajo">Bajo</option>
                      </select>
                    </td>
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <td key={`lm-${idx}`} className="text-center">
                        <input type="checkbox" className="form-check-input" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Lengua de uso</label>
            <div className="table-responsive">
              <table className="table table-bordered mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Grado dominio</th>
                    <th>Comprende</th>
                    <th>Habla</th>
                    <th>Lee</th>
                    <th>Escribe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select className="form-select">
                        <option value="">Seleccione</option>
                        <option value="alto">Alto</option>
                        <option value="medio">Medio</option>
                        <option value="bajo">Bajo</option>
                      </select>
                    </td>
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <td key={`lu-${idx}`} className="text-center">
                        <input type="checkbox" className="form-check-input" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Escolaridad alcanzada</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Establecimiento</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-2">
            <label className="form-label">RBD</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </section>

      {/* Trayectoria escolar */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold text-uppercase mb-3">Trayectoria escolar</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Edad de ingreso al sistema infantil</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Asistió a jardín infantil</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="jardin" />
              <label className="form-check-label">Sí</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="jardin" />
              <label className="form-check-label">No</label>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Ha repetido curso</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="repite" />
              <label className="form-check-label">Sí</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="repite" />
              <label className="form-check-label">No</label>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">N° de colegios en que ha estado</label>
            <input type="number" min="0" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Modalidad de enseñanza</label>
            <div className="d-flex gap-3 flex-wrap">
              {["Regular", "Especial", "Técnica"].map((label) => (
                <label key={label} className="form-check-label">
                  <input type="checkbox" className="form-check-input me-1" />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Tiene amigos</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="amigos" />
              <label className="form-check-label">Sí</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="amigos" />
              <label className="form-check-label">No</label>
            </div>
          </div>
        </div>
      </section>

      {/* Situación escolar actual */}
      <section className="mb-4 border rounded p-3">
        <h5 className="fw-bold text-uppercase mb-3">Situación escolar actual</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Nivel / Curso actual</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-8">
            {[
              { label: "Asiste regularmente", name: "regular" },
              { label: "Asiste con agrado", name: "agrado" },
              { label: "Apoyo familiar en tareas", name: "apoyo" },
            ].map((item) => (
              <div key={item.name} className="mb-2">
                <label className="form-label me-3">{item.label}</label>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name={item.name} />
                  <label className="form-check-label">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name={item.name} />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <label className="form-label">Aspectos destacados en su historia educativa</label>
          <textarea className="form-control" rows="3" />
        </div>
        <div className="mt-3">
          <label className="form-label">Observaciones</label>
          <textarea className="form-control" rows="3" />
        </div>
      </section>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Evaluador</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" />
        </div>
      </div>

      {/* Subdimensiones resumen */}
      <section className="border rounded p-3">
        <h5 className="fw-bold text-uppercase mb-3">Subdimensiones</h5>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Área / Subdimensión</th>
                <th>Descripción</th>
                <th className="text-center">S</th>
                <th className="text-center">G</th>
                <th className="text-center">O</th>
                <th className="text-center">N</th>
                <th className="text-center">NO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" className="form-control" /></td>
                <td><input type="text" className="form-control" /></td>
                {["s", "g", "o", "n", "no"].map((suffix) => (
                  <td key={suffix} className="text-center">
                    <input type="radio" name={`subdimension-${suffix}`} className="form-check-input" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <div className="border rounded p-3">
              <p className="mb-1 fw-bold">Significados de la escala</p>
              <ul className="list-unstyled mb-0">
                <li>1 = Siempre</li>
                <li>2 = Generalmente</li>
                <li>3 = Ocasionalmente</li>
                <li>4 = Nunca</li>
                <li>0 = No observado</li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <p className="small text-muted mb-0">
              Si bien para la evaluación diagnóstica de los alumnos y alumnas con NEE en el marco de las exigencias del Decreto Nº 170 la evaluación psicopedagógica es obligatoria, el uso de este instrumento en particular es de carácter optativo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
