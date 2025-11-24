import React from "react";

const SUBDIMENSION_ITEMS = [
  "Se comunica e interactúa con los demás de manera espontánea.",
  "Se comunica e interactúa con los demás de manera guiada.",
  "Participa en conversaciones con sus pares y/o adultos de forma espontánea.",
  "La pronunciación, orden y estructura gramatical de sus expresiones verbales/en lengua de señas favorecen la comprensión del mensaje.",
  "Utiliza oraciones completas en intervenciones orales/en lengua de señas.",
  "Relata en forma secuenciada y clara experiencias personales.",
  "Realiza y cumple instrucciones entregadas oralmente/en lengua de señas.",
  "Ajusta su lenguaje a diversos contextos e interlocutores.",
  "Su expresión oral es rítmica y con curva melódica/Su expresión manual es rítmica, con fluidez de señalización y coherente con la expresión facial y corporal (prosodia) (Espectro Autista).",
  "Utiliza palabras/señas y conceptos rebuscados.",
  "El volumen de su voz/claridad en la señalización se ajusta a las diversas situaciones y/o contextos.",
  "Conoce y usa un vocabulario amplio.",
  "Comunica sensaciones, experiencias, emociones, necesidades e ideas a través del lenguaje oral/lengua de señas.",
  "Repite frecuentemente palabras/señas u oraciones (ecolalia).",
];

const SUBDIMENSION_COLUMNS = [
  { label: "S", detail: "(1)" },
  { label: "G", detail: "(2)" },
  { label: "O", detail: "(3)" },
  { label: "N", detail: "(4)" },
  { label: "NO", detail: "(0)" },
];

function EvaluacionPsicoForm() {
  return (
    <>
      <div className="container py-4">
        {/* === 1. Identificación del estudiante === */}
        <section className="mb-5">
        <h4 className="text-uppercase fw-bold border-bottom pb-2">Identificación del estudiante</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" placeholder="Nombre completo" />
          </div>
          <div className="col-md-3">
            <label className="form-label d-block">Sexo</label>
            <div className="d-flex gap-3">
              {[
                { label: "F", value: "f" },
                { label: "M", value: "m" },
              ].map((option) => (
                <label key={option.value} className="form-check-label">
                  <input type="radio" name="sexo" className="form-check-input me-1" />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha nacimiento</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-3 d-flex gap-2">
            <div className="flex-fill">
              <label className="form-label">Edad actual (años)</label>
              <input type="number" className="form-control" min="0" />
            </div>
            <div className="flex-fill">
              <label className="form-label">Meses</label>
              <input type="number" className="form-control" min="0" max="11" />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">País natal</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-9">
            <label className="form-label">Domicilio</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-4">
            <label className="form-label">Teléfono</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-8">
            <label className="form-label d-block">Vía de comunicación habitual</label>
            <div className="d-flex gap-3 flex-wrap">
              {[
                { label: "Oral", value: "oral" },
                { label: "Lengua de Señas", value: "senas" },
                { label: "Otra", value: "otra" },
              ].map((option) => (
                <label key={option.value} className="form-check-label">
                  <input type="checkbox" className="form-check-input me-1" />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <label className="form-label">Lengua materna</label>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
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
                    <td>Seleccione</td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Lengua de uso</label>
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
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
                    <td>Seleccione</td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                    <td><input type="checkbox" className="form-check-input" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-4">
            <label className="form-label">Escolaridad alcanzada</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-5">
            <label className="form-label">Establecimiento</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">RBD</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </section>

      {/* === 2. Trayectoria escolar === */}
      <section className="mb-5">
        <h4 className="text-uppercase fw-bold border-bottom pb-2">Trayectoria escolar</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Edad de ingreso al sistema infantil</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Asistió jardín infantil</label>
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
            <label className="form-label">Nº de colegios en que ha estado</label>
            <input type="number" className="form-control" min="0" />
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">Modalidad de enseñanza</label>
            <div className="d-flex gap-3 flex-wrap">
              {["Regular", "Especial", "Técnica"].map((label) => (
                <label key={label} className="form-check-label">
                  <input type="checkbox" className="form-check-input me-1" />{label}
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
          <div className="col-12">
            <label className="form-label">Motivo de los cambios</label>
            <textarea className="form-control" rows="2" />
          </div>
        </div>
      </section>

      {/* === 3. Situación escolar actual === */}
      <section className="mb-5">
        <h4 className="text-uppercase fw-bold border-bottom pb-2">Situación escolar actual</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Nivel / Curso actual</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-8 d-flex flex-column gap-2">
            {["Asiste regularmente", "Asiste con agrado", "Apoyo familiar en tareas"].map((label, index) => (
              <div key={label}>
                <label className="form-label me-3">{label}</label>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name={`situacion-${index}`} />
                  <label className="form-check-label">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name={`situacion-${index}`} />
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

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <label className="form-label">Evaluador</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-control" />
          </div>
        </div>
      </section>

        {/* === 4. Subdimensiones === */}
        <section className="mb-4">
          <div className="bg-primary text-white px-3 py-2 rounded-top">
            <strong>SUBDIMENSIONES</strong>
          </div>
          <div className="px-3 py-2 border border-top-0 rounded-bottom mb-3">
            Marque con una X la opción que representa los comportamientos en el contexto escolar.
          </div>

          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th style={{ width: "40px" }}>N°</th>
                  <th className="text-start">Descripción</th>
                  {SUBDIMENSION_COLUMNS.map((col) => (
                    <th key={col.label} style={{ width: "75px" }}>
                      {col.label}
                      <br />
                      <small>{col.detail}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUBDIMENSION_ITEMS.map((texto, idx) => (
                  <tr key={texto}>
                    <td className="text-center fw-bold">{idx + 1}</td>
                    <td>{texto}</td>
                    {SUBDIMENSION_COLUMNS.map((col) => (
                      <td key={`${idx}-${col.label}`} className="text-center">
                        <input type="radio" name={`subdimension-${idx}`} className="form-check-input" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-lg-6">
              <label className="form-label">
                Describa la mayor habilidad del estudiante en esta área (y contexto en que se manifiesta)
              </label>
              <textarea className="form-control" rows="3" />
            </div>
            <div className="col-lg-6">
              <label className="form-label">
                Describa la mayor debilidad del estudiante en esta área (y contexto en que se manifiesta)
              </label>
              <textarea className="form-control" rows="3" />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Síntesis: Señale el desempeño general del estudiante en esta área</label>
              <textarea className="form-control" rows="2" />
            </div>
            <div className="col-lg-6">
              <label className="form-label">
                Observaciones (detalle aspectos o antecedentes no considerados o que crea importante relevar o complementar)
              </label>
              <textarea className="form-control" rows="2" />
            </div>
          </div>

          <div className="row g-3 mt-3">
            <div className="col-md-4 col-lg-3">
              <div className="border rounded p-3 h-100">
                <strong>Significados de la escala</strong>
                <ul className="list-unstyled mb-0 small">
                  <li>1 = Siempre</li>
                  <li>2 = Generalmente</li>
                  <li>3 = Ocasionalmente</li>
                  <li>4 = Nunca</li>
                  <li>0 = No observado</li>
                </ul>
              </div>
            </div>
            <div className="col-md-8 col-lg-9">
              <div className="alert alert-warning mb-0">
                Completar esta tabla para cada área del instrumento original. Puedes duplicar filas según sea necesario.
              </div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}

export default EvaluacionPsicoForm;
