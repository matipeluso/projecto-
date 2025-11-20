// src/paginas/Anamnesis/secciones/AntecedentesEscolaresSection.jsx
import React from "react";

export default function AntecedentesEscolaresSection({ value, setValue, onSave }) {
  const set = (grp, k, v) => setValue({ ...value, [grp]: { ...value[grp], [k]: v } });
  const setNested = (grp, sub, k, v) =>
    setValue({ ...value, [grp]: { ...value[grp], [sub]: { ...value[grp][sub], [k]: v } } });

  const toggleFromList = (arr, k, checked) => {
    const next = arr ? [...arr] : [];
    const idx = next.indexOf(k);
    if (checked && idx === -1) next.push(k);
    if (!checked && idx !== -1) next.splice(idx, 1);
    return next;
  };

  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">7. Antecedentes Escolares y Apoyo de la Familia</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>

      <div className="card-body">
        <h6 className="mb-2">Trayectoria escolar</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Edad de ingreso al sistema escolar</label>
            <input className="form-control" value={value.trayectoria.edad_ingreso} onChange={(e) => set("trayectoria","edad_ingreso", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label d-block">¿Asistió a jardín infantil?</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" id="jardSi" checked={value.trayectoria.asistio_jardin === true} onChange={() => set("trayectoria","asistio_jardin", true)} />
                <label className="form-check-label" htmlFor="jardSi">Sí</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="jardNo" checked={value.trayectoria.asistio_jardin === false} onChange={() => set("trayectoria","asistio_jardin", false)} />
                <label className="form-check-label" htmlFor="jardNo">No</label>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Nº de colegios en que ha estudiado</label>
            <input className="form-control" value={value.trayectoria.numero_colegios} onChange={(e) => set("trayectoria","numero_colegios", e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Modalidad de enseñanza</label>
            <select className="form-select" value={value.trayectoria.modalidad} onChange={(e) => set("trayectoria","modalidad", e.target.value)}>
              <option value="">Seleccione…</option>
              <option value="regular">Regular</option>
              <option value="especial">Especial</option>
              <option value="tecnica">Técnica</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Otro (modalidad)</label>
            <input className="form-control" value={value.trayectoria.modalidad_otro} onChange={(e) => set("trayectoria","modalidad_otro", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Motivo de los cambios</label>
            <input className="form-control" value={value.trayectoria.motivo_cambios} onChange={(e) => set("trayectoria","motivo_cambios", e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label d-block">¿Ha repetido cursos?</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input className="form-check-input" type="radio" id="repSi" checked={value.trayectoria.repitio === true} onChange={() => set("trayectoria","repitio", true)} />
                <label className="form-check-label" htmlFor="repSi">Sí</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="repNo" checked={value.trayectoria.repitio === false} onChange={() => set("trayectoria","repitio", false)} />
                <label className="form-check-label" htmlFor="repNo">No</label>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Curso(s)</label>
            <input className="form-control" value={value.trayectoria.cursos_repetidos} onChange={(e) => set("trayectoria","cursos_repetidos", e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Motivo</label>
            <input className="form-control" value={value.trayectoria.motivo_repeticion} onChange={(e) => set("trayectoria","motivo_repeticion", e.target.value)} />
          </div>
        </div>

        <h6 className="mt-3 mb-2">Situación actual</h6>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Nivel/curso actual</label>
            <input className="form-control" value={value.situacion_actual.nivel_curso} onChange={(e) => set("situacion_actual","nivel_curso", e.target.value)} />
          </div>
          {[
            ["dif_aprendizaje","Dificultad de aprendizaje"],
            ["dif_participar","Dificultad para participar"],
            ["conducta_disruptiva","Conducta disruptiva"],
            ["asiste_regularmente","Asiste regularmente"],
            ["asiste_con_agrado","Asiste con agrado"],
            ["apoyo_familiar_tareas","Apoyo familiar en tareas"],
            ["amigos","Amigos(as)"],
          ].map(([key,label]) => (
            <div className="col-md-4" key={key}>
              <label className="form-label d-block">{label}</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" id={`sa-${key}-si`} checked={value.situacion_actual[key] === true} onChange={() => set("situacion_actual", key, true)} />
                  <label className="form-check-label" htmlFor={`sa-${key}-si`}>Sí</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id={`sa-${key}-no`} checked={value.situacion_actual[key] === false} onChange={() => set("situacion_actual", key, false)} />
                  <label className="form-check-label" htmlFor={`sa-${key}-no`}>No</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h6 className="mt-3 mb-2">Actitud de la familia</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Evaluación del desempeño escolar</label>
            <select className="form-select" value={value.actitud_familiar.evalua_desempeno} onChange={(e) => set("actitud_familiar","evalua_desempeno", e.target.value)}>
              <option value="">Seleccione…</option>
              <option value="satisfactorio">satisfactorio</option>
              <option value="insatisfactorio">insatisfactorio</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Motivos (si insatisfactorio)</label>
            <input className="form-control" value={value.actitud_familiar.evalua_motivos} onChange={(e) => set("actitud_familiar","evalua_motivos", e.target.value)} />
          </div>

          <div className="col-12">
            <label className="form-label d-block">Respuesta frente a dificultades</label>
            <div className="d-flex flex-wrap gap-3">
              {["apoyo","castigo","indiferencia","compasion","tension","otra"].map((k) => (
                <div className="form-check" key={k}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`rd-${k}`}
                    checked={(value.actitud_familiar.respuesta_dificultades || []).includes(k)}
                    onChange={(e) => {
                      const next = toggleFromList(value.actitud_familiar.respuesta_dificultades || [], k, e.target.checked);
                      set("actitud_familiar","respuesta_dificultades", next);
                    }}
                  />
                  <label className="form-check-label" htmlFor={`rd-${k}`}>{k}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Otra (dificultades)</label>
            <input className="form-control" value={value.actitud_familiar.respuesta_dificultades_otra} onChange={(e) => set("actitud_familiar","respuesta_dificultades_otra", e.target.value)} />
          </div>

          <div className="col-12">
            <label className="form-label d-block">Respuesta frente a éxitos</label>
            <div className="d-flex flex-wrap gap-3">
              {["apoyo","indiferencia","otra"].map((k) => (
                <div className="form-check" key={k}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`re-${k}`}
                    checked={(value.actitud_familiar.respuesta_exitos || []).includes(k)}
                    onChange={(e) => {
                      const next = toggleFromList(value.actitud_familiar.respuesta_exitos || [], k, e.target.checked);
                      set("actitud_familiar","respuesta_exitos", next);
                    }}
                  />
                  <label className="form-check-label" htmlFor={`re-${k}`}>{k}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Otra (éxitos)</label>
            <input className="form-control" value={value.actitud_familiar.respuesta_exitos_otra} onChange={(e) => set("actitud_familiar","respuesta_exitos_otra", e.target.value)} />
          </div>

          <div className="col-12">
            <label className="form-label d-block">Refuerzos/Premios</label>
            <div className="d-flex flex-wrap gap-3">
              {[
                ["afectivas","Expresiones afectivas"],
                ["alimentos","Alimentos preferidos"],
                ["ver_tv","Ver TV"],
                ["juguetes","Juguetes"],
                ["tiempo_libre","Tiempo libre"],
              ].map(([k,label]) => (
                <div className="form-check" key={k}>
                  <input className="form-check-input" type="checkbox" id={`rp-${k}`} checked={value.actitud_familiar.refuerzos_premios[k]} onChange={(e) => setNested("actitud_familiar","refuerzos_premios", k, e.target.checked)} />
                  <label className="form-check-label" htmlFor={`rp-${k}`}>{label}</label>
                </div>
              ))}
              <div className="input-group" style={{maxWidth: 320}}>
                <span className="input-group-text">Otros</span>
                <input className="form-control" value={value.actitud_familiar.refuerzos_premios.otros} onChange={(e) => setNested("actitud_familiar","refuerzos_premios", "otros", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label d-block">¿Quiénes apoyan el proceso?</label>
            <div className="d-flex flex-wrap gap-3">
              {[
                ["madre","madre"],["padre","padre"],["hermanos","hermanos/as"],
                ["otros_familiares","otros familiares"],["otros_profesionales","otros profesionales"],
              ].map(([k,label]) => (
                <div className="form-check" key={k}>
                  <input className="form-check-input" type="checkbox" id={`qa-${k}`} checked={value.actitud_familiar.quienes_apoyan[k]} onChange={(e) => setNested("actitud_familiar","quienes_apoyan", k, e.target.checked)} />
                  <label className="form-check-label" htmlFor={`qa-${k}`}>{label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Expectativas frente al futuro escolar</label>
            <select className="form-select" value={value.actitud_familiar.expectativas} onChange={(e) => set("actitud_familiar","expectativas", e.target.value)}>
              <option value="">Seleccione…</option>
              <option value="alta">alta (incluye al grupo familiar)</option>
              <option value="mediana">mediana (incluye sólo madre/padre)</option>
              <option value="baja">baja (no incluye a ningún miembro)</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Ambiente físico/emocional para el aprendizaje</label>
            <select className="form-select" value={value.actitud_familiar.ambiente_aprendizaje} onChange={(e) => set("actitud_familiar","ambiente_aprendizaje", e.target.value)}>
              <option value="">Seleccione…</option>
              <option value="ambos">Ambos</option>
              <option value="solo_fisico">Sólo físico</option>
              <option value="solo_emocional">Sólo emocional</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Comentarios u otras observaciones</label>
          <textarea className="form-control" rows={3} value={value.comentarios_observaciones} onChange={(e) => set("comentarios_observaciones","", e.target.value)} />
        </div>
      </div>
    </section>
  );
}