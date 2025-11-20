// src/paginas/Anamnesis/secciones/SaludDesarrolloSection.jsx
import React from "react";

export default function SaludDesarrolloSection({ value, setValue, onSave }) {
  const set = (k, v) => setValue({ ...value, [k]: v });
  const setN = (grp, k, v) => setValue({ ...value, [grp]: { ...value[grp], [k]: v } });
  const setNN = (grp, sub, k, v) =>
    setValue({
      ...value,
      [grp]: { ...value[grp], [sub]: { ...value[grp][sub], [k]: v } },
    });

  return (
    <section className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0">5. Antecedentes relativos al desarrollo y salud del/la estudiante</h5>
        <button className="btn btn-primary btn-sm" onClick={onSave}>Guardar sección</button>
      </div>

      <div className="card-body">
        {/* 5. Diagnóstico previo */}
        <div className="mb-3">
          <label className="form-label">¿El/la estudiante tiene algún diagnóstico previo?</label>
          <input
            className="form-control"
            value={value.diagnostico_prev}
            onChange={(e) => set("diagnostico_prev", e.target.value)}
            placeholder="Pediatría / Psicología / Kinesiología / Psiquiatría / Genético / Psicopedagogía / Fonoaudiología / Terapia Ocupacional / Neurología / Otro"
          />
        </div>

        {/* 5.1 Primer año de vida */}
        <div className="border rounded p-3 mb-3">
          <h6 className="mb-3">5.1. Primer año de vida</h6>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Tipo de parto</label>
              <select
                className="form-select"
                value={value.primer_anio.tipo_parto}
                onChange={(e) => setNN("primer_anio", "", "tipo_parto", e.target.value)}
              >
                <option value="">Seleccione…</option>
                <option value="normal">normal</option>
                <option value="inducido">inducido</option>
                <option value="forceps">fórceps</option>
                <option value="cesarea">cesárea</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Motivo cesárea (si aplica)</label>
              <input
                className="form-control"
                value={value.primer_anio.motivo_cesarea}
                onChange={(e) => setNN("primer_anio", "", "motivo_cesarea", e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label d-block">Tuvo asistencia médica en el parto</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="asistSi"
                    checked={value.primer_anio.asistencia_parto === true}
                    onChange={() => setNN("primer_anio", "", "asistencia_parto", true)}
                  />
                  <label className="form-check-label" htmlFor="asistSi">Sí</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="asistNo"
                    checked={value.primer_anio.asistencia_parto === false}
                    onChange={() => setNN("primer_anio", "", "asistencia_parto", false)}
                  />
                  <label className="form-check-label" htmlFor="asistNo">No</label>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label">Peso (kg)</label>
              <input className="form-control" value={value.primer_anio.peso} onChange={(e) => setNN("primer_anio", "", "peso", e.target.value)} />
            </div>

            <div className="col-md-3">
              <label className="form-label">Talla (cm)</label>
              <input className="form-control" value={value.primer_anio.talla} onChange={(e) => setNN("primer_anio", "", "talla", e.target.value)} />
            </div>

            <div className="col-12">
              <label className="form-label">Antecedentes relevantes del Embarazo y Parto</label>
              <textarea className="form-control" rows={3} value={value.primer_anio.antecedentes_embarazo} onChange={(e) => setNN("primer_anio", "", "antecedentes_embarazo", e.target.value)} />
            </div>

            {/* Eventos 12m */}
            <div className="col-12">
              <label className="form-label">Eventos en los 12 primeros meses</label>
              <div className="row g-3">
                {[
                  ["desnutricion","Desnutrición"],
                  ["traumatismos","Traumatismos"],
                  ["encefalitis","Encefalitis"],
                  ["obesidad","Obesidad"],
                  ["intoxicacion","Intoxicación"],
                  ["meningitis","Meningitis"],
                  ["fiebre_alta","Fiebre alta"],
                  ["enf_respiratoria","Enfermedad respiratoria"],
                  ["convulsiones","Convulsiones"],
                  ["asma","Asma"],
                ].map(([key,label]) => (
                  <div className="col-md-4" key={key}>
                    <span className="d-block">{label}</span>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" id={`ev-${key}-si`} checked={value.primer_anio.eventos12m[key] === true} onChange={() => setNN("primer_anio","eventos12m", key, true)} />
                        <label className="form-check-label" htmlFor={`ev-${key}-si`}>Sí</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" id={`ev-${key}-no`} checked={value.primer_anio.eventos12m[key] === false} onChange={() => setNN("primer_anio","eventos12m", key, false)} />
                        <label className="form-check-label" htmlFor={`ev-${key}-no`}>No</label>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-12 col-md-6">
                  <label className="form-label">Otra(s)</label>
                  <input className="form-control" value={value.primer_anio.eventos12m.otra} onChange={(e) => setNN("primer_anio","eventos12m","otra", e.target.value)} />
                </div>
              </div>
            </div>

            {/* Hospitalizaciones y controles */}
            <div className="col-md-3">
              <label className="form-label d-block">Hospitalizaciones</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="hospSi" checked={value.primer_anio.hospitalizaciones === true} onChange={() => setNN("primer_anio", "", "hospitalizaciones", true)} />
                  <label className="form-check-label" htmlFor="hospSi">Sí</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="hospNo" checked={value.primer_anio.hospitalizaciones === false} onChange={() => setNN("primer_anio", "", "hospitalizaciones", false)} />
                  <label className="form-check-label" htmlFor="hospNo">No</label>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <label className="form-label">Motivos y duración</label>
              <input className="form-control" value={value.primer_anio.hosp_detalle} onChange={(e) => setNN("primer_anio","", "hosp_detalle", e.target.value)} />
            </div>

            <div className="col-md-3">
              <label className="form-label d-block">Controles periódicos de salud</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="ctrlSi" checked={value.primer_anio.controles_salud === true} onChange={() => setNN("primer_anio","", "controles_salud", true)} />
                  <label className="form-check-label" htmlFor="ctrlSi">Sí</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="ctrlNo" checked={value.primer_anio.controles_salud === false} onChange={() => setNN("primer_anio","", "controles_salud", false)} />
                  <label className="form-check-label" htmlFor="ctrlNo">No</label>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label d-block">Vacunas</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="vacSi" checked={value.primer_anio.vacunas === true} onChange={() => setNN("primer_anio","", "vacunas", true)} />
                  <label className="form-check-label" htmlFor="vacSi">Sí</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="vacNo" checked={value.primer_anio.vacunas === false} onChange={() => setNN("primer_anio","", "vacunas", false)} />
                  <label className="form-check-label" htmlFor="vacNo">No</label>
                </div>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label">Observaciones</label>
              <textarea className="form-control" rows={3} value={value.primer_anio.observaciones} onChange={(e) => setNN("primer_anio","", "observaciones", e.target.value)} />
            </div>
          </div>
        </div>

        {/* 5.2 Desarrollo Sensorio-Motriz */}
        <div className="border rounded p-3 mb-3">
          <h6 className="mb-3">5.2. Desarrollo Sensorio Motriz</h6>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Fija la cabeza</label>
              <input className="form-control" value={value.sensoriomotriz.fija_cabeza} onChange={(e) => setN("sensoriomotriz", "fija_cabeza", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Se sienta solo/a</label>
              <input className="form-control" value={value.sensoriomotriz.se_sienta_solo} onChange={(e) => setN("sensoriomotriz", "se_sienta_solo", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Camina sin apoyo</label>
              <input className="form-control" value={value.sensoriomotriz.camina_sin_apoyo} onChange={(e) => setN("sensoriomotriz", "camina_sin_apoyo", e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Primeras palabras</label>
              <input className="form-control" value={value.sensoriomotriz.primeras_palabras} onChange={(e) => setN("sensoriomotriz", "primeras_palabras", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Primeras frases</label>
              <input className="form-control" value={value.sensoriomotriz.primeras_frases} onChange={(e) => setN("sensoriomotriz", "primeras_frases", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Se viste solo/a</label>
              <input className="form-control" value={value.sensoriomotriz.se_viste_solo} onChange={(e) => setN("sensoriomotriz", "se_viste_solo", e.target.value)} />
            </div>

            <div className="col-md-3">
              <label className="form-label">Esfínter vesical (Diurno)</label>
              <input className="form-control" value={value.sensoriomotriz.esfinter_vesical_diurno} onChange={(e) => setN("sensoriomotriz", "esfinter_vesical_diurno", e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Esfínter vesical (Nocturno)</label>
              <input className="form-control" value={value.sensoriomotriz.esfinter_vesical_nocturno} onChange={(e) => setN("sensoriomotriz", "esfinter_vesical_nocturno", e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Esfínter anal (Diurno)</label>
              <input className="form-control" value={value.sensoriomotriz.esfinter_anal_diurno} onChange={(e) => setN("sensoriomotriz", "esfinter_anal_diurno", e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Esfínter anal (Nocturno)</label>
              <input className="form-control" value={value.sensoriomotriz.esfinter_anal_nocturno} onChange={(e) => setN("sensoriomotriz", "esfinter_anal_nocturno", e.target.value)} />
            </div>

            <div className="col-12">
              <label className="form-label">Observaciones</label>
              <textarea className="form-control" rows={3} value={value.sensoriomotriz.obs} onChange={(e) => setN("sensoriomotriz", "obs", e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Actividad motora general</label>
              <select className="form-select" value={value.sensoriomotriz.actividad_motora} onChange={(e) => setN("sensoriomotriz", "actividad_motora", e.target.value)}>
                <option value="">Seleccione…</option>
                <option value="normal">normal</option>
                <option value="activo">activo</option>
                <option value="hiperactivo">hiperactivo</option>
                <option value="hipoactivo">hipoactivo</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tono muscular general</label>
              <select className="form-select" value={value.sensoriomotriz.tono_muscular} onChange={(e) => setN("sensoriomotriz", "tono_muscular", e.target.value)}>
                <option value="">Seleccione…</option>
                <option value="normal">normal</option>
                <option value="hipertonico">hipertónico</option>
                <option value="hipotonico">hipotónico</option>
              </select>
            </div>

            {/* Gruesa */}
            {[
              ["estabilidad_caminar","Estabilidad al caminar"],
              ["caidas_frecuentes","Caídas frecuentes"],
              ["dominancia_lateral","Dominancia lateral"],
            ].map(([key,label]) => (
              <div className="col-md-4" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`gr-${key}-si`} checked={value.sensoriomotriz.gruesa[key] === true} onChange={() => setNN("sensoriomotriz","gruesa", key, true)} />
                    <label className="form-check-label" htmlFor={`gr-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`gr-${key}-no`} checked={value.sensoriomotriz.gruesa[key] === false} onChange={() => setNN("sensoriomotriz","gruesa", key, false)} />
                    <label className="form-check-label" htmlFor={`gr-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}

            {/* Fina */}
            {[
              ["garra","Garra"],["prension","Prensión"],["pinza","Pinza"],
              ["ensarta","Ensarta"],["dibuja","Dibuja"],["escribe","Escribe"],
            ].map(([key,label]) => (
              <div className="col-md-4" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`fn-${key}-si`} checked={value.sensoriomotriz.fina[key] === true} onChange={() => setNN("sensoriomotriz","fina", key, true)} />
                    <label className="form-check-label" htmlFor={`fn-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`fn-${key}-no`} checked={value.sensoriomotriz.fina[key] === false} onChange={() => setNN("sensoriomotriz","fina", key, false)} />
                    <label className="form-check-label" htmlFor={`fn-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}

            {/* Cognitivos */}
            {[
              ["reacciona_voces_caras","Reacciona a voces/car as familiares"],
              ["manipula_explora","Manipula y explora objetos"],
              ["demanda_objetos_compania","Demanda objetos y compañía"],
              ["comprende_prohibiciones","Comprende prohibiciones"],
              ["sonrie_balbucea","Sonríe / balbucea / grita / llora / señala"],
              ["descoordinacion_ojomano","Descoordinación ojo-mano"],
            ].map(([key,label]) => (
              <div className="col-md-4" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`cg-${key}-si`} checked={value.sensoriomotriz.cognitivos[key] === true} onChange={() => setNN("sensoriomotriz","cognitivos", key, true)} />
                    <label className="form-check-label" htmlFor={`cg-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`cg-${key}-no`} checked={value.sensoriomotriz.cognitivos[key] === false} onChange={() => setNN("sensoriomotriz","cognitivos", key, false)} />
                    <label className="form-check-label" htmlFor={`cg-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5.3 Visión - Audición */}
        <div className="border rounded p-3 mb-3">
          <h6 className="mb-3">5.3. Visión - Audición</h6>
          <div className="row g-3">
            {[
              ["estimulos_visuales","Interés por estímulos visuales"],
              ["estimulos_auditivos","Interés por estímulos auditivos"],
              ["ojos_irritados_llorosos","Ojos irritados/llorosos"],
              ["reconoce_sonidos_familiares","Reconoce voces/sonidos familiares"],
              ["dolores_cabeza","Dolores de cabeza frecuentes"],
              ["gira_cabeza_llamado_ruido","Gira la cabeza al llamado/ruido"],
              ["acerca_aleja_objetos","Acerca/aleja demasiado objetos a la vista"],
              ["acerca_oidos_fuente_sonido","Acerca oídos a fuente de sonido"],
              ["sigue_desplazamiento","Sigue desplazamiento con la vista"],
              ["tapa_golpea_oidos","Se tapa/golpea los oídos"],
              ["dolores_oidos_frecuentes","Dolores de oídos frecuentes"],
              ["movimientos_oculares_anormales","Movimientos oculares “anormales”"],
              ["conductas_erroneas","Conductas erróneas (tropiezos/choques)"],
              ["pronunciacion_adecuada","Pronunciación oral adecuada"],
              ["dx_visual","Dx visual: miopía/estrabismo/astigmatismo"],
              ["dx_auditivo","Dx auditivo: otitis crónica/hipoacusia"],
            ].map(([key,label]) => (
              <div className="col-md-6" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`va-${key}-si`} checked={value.vision_audicion[key] === true} onChange={() => setN("vision_audicion", key, true)} />
                    <label className="form-check-label" htmlFor={`va-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`va-${key}-no`} checked={value.vision_audicion[key] === false} onChange={() => setN("vision_audicion", key, false)} />
                    <label className="form-check-label" htmlFor={`va-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-12">
              <label className="form-label">Observaciones</label>
              <textarea className="form-control" rows={3} value={value.vision_audicion.observaciones} onChange={(e) => setN("vision_audicion", "observaciones", e.target.value)} />
            </div>
          </div>
        </div>

        {/* 5.4 Desarrollo del Lenguaje */}
        <div className="border rounded p-3 mb-3">
          <h6 className="mb-3">5.4. Desarrollo del Lenguaje</h6>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Modo de comunicación preferente</label>
              <select className="form-select" value={value.lenguaje.modo_comunicacion} onChange={(e) => setNN("lenguaje","", "modo_comunicacion", e.target.value)}>
                <option value="">Seleccione…</option>
                <option value="oral">oral</option>
                <option value="gestual">gestual</option>
                <option value="mixto">mixto</option>
                <option value="otro">otro</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Otro (especifique)</label>
              <input className="form-control" value={value.lenguaje.otro_modo} onChange={(e) => setNN("lenguaje","", "otro_modo", e.target.value)} />
            </div>
          </div>

          <h6 className="mt-3">Características del lenguaje expresivo</h6>
          <div className="row g-3">
            {[
              ["balbucea_sonidos","Balbucea/emite sonidos"],
              ["emite_frases","Emite/produce frases"],
              ["gestos_senas_aisladas","Gestos/señas aisladas"],
              ["relata_experiencias","Relata experiencias"],
              ["emite_palabras_senas","Emite palabras/produce señas"],
              ["emision_pronunciacion_clara","Emisión/pronunciación/producción clara"],
            ].map(([key,label]) => (
              <div className="col-md-4" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`exp-${key}-si`} checked={value.lenguaje.expresivo[key] === true} onChange={() => setNN("lenguaje","expresivo", key, true)} />
                    <label className="form-check-label" htmlFor={`exp-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`exp-${key}-no`} checked={value.lenguaje.expresivo[key] === false} onChange={() => setNN("lenguaje","expresivo", key, false)} />
                    <label className="form-check-label" htmlFor={`exp-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h6 className="mt-3">Características del lenguaje comprensivo</h6>
          <div className="row g-3">
            {[
              ["identifica_objetos","Identifica objetos"],
              ["sigue_instrucciones_simples","Sigue instrucciones simples"],
              ["identifica_personas","Identifica personas"],
              ["sigue_instrucciones_complejas","Sigue instrucciones complejas"],
              ["comprende_conceptos_abstractos","Comprende conceptos abstractos"],
              ["sigue_instrucciones_grupales","Sigue instrucciones grupales"],
              ["responde_preguntas_vida_diaria","Responde coherente en vida diaria"],
              ["comprende_relatos_noticias_cuentos","Comprende relatos/noticias/cuentos"],
            ].map(([key,label]) => (
              <div className="col-md-4" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`comp-${key}-si`} checked={value.lenguaje.comprensivo[key] === true} onChange={() => setNN("lenguaje","comprensivo", key, true)} />
                    <label className="form-check-label" htmlFor={`comp-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`comp-${key}-no`} checked={value.lenguaje.comprensivo[key] === false} onChange={() => setNN("lenguaje","comprensivo", key, false)} />
                    <label className="form-check-label" htmlFor={`comp-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-4">
              <label className="form-label d-block">¿Pérdida del lenguaje oral?</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="perdSi" checked={value.lenguaje.perdida_lenguaje.hubo === true} onChange={() => setNN("lenguaje","perdida_lenguaje", "hubo", true)} />
                  <label className="form-check-label" htmlFor="perdSi">Sí</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="perdNo" checked={value.lenguaje.perdida_lenguaje.hubo === false} onChange={() => setNN("lenguaje","perdida_lenguaje", "hubo", false)} />
                  <label className="form-check-label" htmlFor="perdNo">No</label>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <label className="form-label">Edad y motivos</label>
              <input className="form-control" value={value.lenguaje.perdida_lenguaje.edad_motivo} onChange={(e) => setNN("lenguaje","perdida_lenguaje", "edad_motivo", e.target.value)} />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Observaciones</label>
            <textarea className="form-control" rows={3} value={value.lenguaje.observaciones} onChange={(e) => setNN("lenguaje","", "observaciones", e.target.value)} />
          </div>
        </div>

        {/* 5.5 Desarrollo Social */}
        <div className="border rounded p-3 mb-3">
          <h6 className="mb-3">5.5. Desarrollo Social</h6>
          <div className="row g-3">
            {[
              ["se_relaciona_entorno","Se relaciona espontáneamente con su entorno"],
              ["relacion_colaborativa","Se relaciona en forma colaborativa"],
              ["explica_razones","Explica razones de sus comportamientos"],
              ["respeta_normas_sociales","Respeta normas sociales"],
              ["participa_actividades_grupales","Participa en actividades grupales"],
              ["respeta_normas_escolares","Respeta normas escolares"],
              ["opta_trabajo_individual","Opta por trabajo individual"],
              ["sentido_humor","Muestra sentido del humor"],
              ["lenguaje_ecolalico","Lenguaje ecolálico"],
              ["movimientos_estereotipados","Movimientos estereotipados"],
              ["dificultad_adaptarse","Dificultad para adaptarse a situaciones nuevas"],
              ["pataletas_frecuentes","Pataletas frecuentes"],
            ].map(([key,label]) => (
              <div className="col-md-6" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`ds-${key}-si`} checked={value.desarrollo_social[key] === true} onChange={() => setN("desarrollo_social", key, true)} />
                    <label className="form-check-label" htmlFor={`ds-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`ds-${key}-no`} checked={value.desarrollo_social[key] === false} onChange={() => setN("desarrollo_social", key, false)} />
                    <label className="form-check-label" htmlFor={`ds-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-3 mt-1">
            {["luces","sonidos","personas_extranias"].map((k) => (
              <div className="col-md-4" key={k}>
                <label className="form-label">Reacción a {k === "luces" ? "luces" : k === "sonidos" ? "sonidos" : "personas extrañas"}</label>
                <select className="form-select" value={value.desarrollo_social.reaccion_estimulos[k]} onChange={(e) => setNN("desarrollo_social","reaccion_estimulos", k, e.target.value)}>
                  <option value="">Seleccione…</option>
                  <option value="natural">natural</option>
                  <option value="desmesurada">desmesurada</option>
                </select>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <label className="form-label">Observaciones</label>
            <textarea className="form-control" rows={3} value={value.desarrollo_social.observaciones} onChange={(e) => setN("desarrollo_social", "observaciones", e.target.value)} />
          </div>
        </div>

        {/* 5.6 Estado Actual de Salud */}
        <div className="border rounded p-3">
          <h6 className="mb-3">5.6. Estado Actual de Salud del/la Estudiante</h6>
          <div className="row g-3">
            {[
              ["vacunas_al_dia","Vacunas al día"],
              ["trastorno_motor","Trastorno motor"],
              ["epilepsia","Epilepsia"],
              ["problema_bronco_respiratorio","Problema bronco-respiratorio"],
              ["problemas_cardiacos","Problemas cardiacos"],
              ["enfermedad_infecto_contagiosa","Enfermedad infecto-contagiosa"],
              ["paraplejia","Paraplejia"],
              ["trastorno_emocional","Trastorno emocional"],
              ["perdida_auditiva","Pérdida auditiva"],
              ["trastorno_conductual","Trastorno conductual"],
              ["perdida_visual","Pérdida visual"],
            ].map(([key,label]) => (
              <div className="col-md-6" key={key}>
                <span className="d-block">{label}</span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`es-${key}-si`} checked={value.estado_actual_salud[key] === true} onChange={() => setNN("estado_actual_salud","", key, true)} />
                    <label className="form-check-label" htmlFor={`es-${key}-si`}>Sí</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id={`es-${key}-no`} checked={value.estado_actual_salud[key] === false} onChange={() => setNN("estado_actual_salud","", key, false)} />
                    <label className="form-check-label" htmlFor={`es-${key}-no`}>No</label>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-md-6">
              <label className="form-label">Otro (especifique)</label>
              <input className="form-control" value={value.estado_actual_salud.otro} onChange={(e) => setNN("estado_actual_salud","", "otro", e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Control/tratamiento</label>
              <input className="form-control" value={value.estado_actual_salud.control_tratamiento} onChange={(e) => setNN("estado_actual_salud","", "control_tratamiento", e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Alimentación</label>
              <select className="form-select" value={value.estado_actual_salud.alimentacion} onChange={(e) => setNN("estado_actual_salud","", "alimentacion", e.target.value)}>
                <option value="">Seleccione…</option>
                <option value="normal">normal</option>
                <option value="malo">“malo/a” para comer</option>
                <option value="bueno">“bueno/a” para comer</option>
                <option value="otro">otro</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Otro (alimentación)</label>
              <input className="form-control" value={value.estado_actual_salud.alimentacion_otro} onChange={(e) => setNN("estado_actual_salud","", "alimentacion_otro", e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Peso (apreciación informante)</label>
              <select className="form-select" value={value.estado_actual_salud.peso_apreciacion} onChange={(e) => setNN("estado_actual_salud","", "peso_apreciacion", e.target.value)}>
                <option value="">Seleccione…</option>
                <option value="normal">normal</option>
                <option value="bajo">bajo peso</option>
                <option value="obesidad">obesidad</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Sueño</label>
              <select className="form-select" value={value.estado_actual_salud.suenio.tipo} onChange={(e) => setNN("estado_actual_salud","suenio", "tipo", e.target.value)}>
                <option value="">Seleccione…</option>
                <option value="normal">normal</option>
                <option value="tranquilo">tranquilo</option>
                <option value="inquieto">inquieto</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Horas que duerme</label>
              <input className="form-control" value={value.estado_actual_salud.suenio.horas} onChange={(e) => setNN("estado_actual_salud","suenio", "horas", e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label d-block">Indicadores de sueño</label>
              <div className="d-flex flex-wrap gap-3">
                {[
                  ["insomnio","insomnio"],
                  ["pesadillas","pesadillas"],
                  ["terrores_nocturnos","terrores nocturnos"],
                  ["sonambulismo","sonambulismo"],
                  ["despierta_buen_humor","despierta de buen humor"],
                ].map(([key,label]) => (
                  <div className="form-check" key={key}>
                    <input className="form-check-input" type="checkbox" id={`su-${key}`} checked={value.estado_actual_salud.suenio[key]} onChange={(e) => setNN("estado_actual_salud","suenio", key, e.target.checked)} />
                    <label className="form-check-label" htmlFor={`su-${key}`}>{label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label">Duerme</label>
              <select className="form-select" value={value.estado_actual_salud.suenio.duerme} onChange={(e) => setNN("estado_actual_salud","suenio", "duerme", e.target.value)}>
                <option value="">Seleccione…</option>
                <option value="solo">solo</option>
                <option value="acompanado">acompañado</option>
              </select>
            </div>
            <div className="col-md-8">
              <label className="form-label">Especifique</label>
              <input className="form-control" value={value.estado_actual_salud.suenio.especificar} onChange={(e) => setNN("estado_actual_salud","suenio", "especificar", e.target.value)} />
            </div>

            <div className="col-md-8">
              <label className="form-label d-block">Humor / Comportamiento habitual</label>
              <div className="d-flex flex-wrap gap-3">
                {[
                  ["alegre","alegre"],["jugueton","juguetón/bromista"],["risueno","risueño(a)"],["triste","triste"],
                  ["serio","serio"],["rebelde","rebelde"],["apatico","apático"],["violento","violento(a)"],
                ].map(([key,label]) => (
                  <div className="form-check" key={key}>
                    <input className="form-check-input" type="checkbox" id={`hm-${key}`} checked={value.estado_actual_salud.humor[key]} onChange={(e) => setNN("estado_actual_salud","humor", key, e.target.checked)} />
                    <label className="form-check-label" htmlFor={`hm-${key}`}>{label}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Otro</label>
              <input className="form-control" value={value.estado_actual_salud.humor.otro} onChange={(e) => setNN("estado_actual_salud","humor", "otro", e.target.value)} />
            </div>

            <div className="col-12">
              <label className="form-label">Observaciones</label>
              <textarea className="form-control" rows={3} value={value.estado_actual_salud.observaciones} onChange={(e) => setNN("estado_actual_salud","", "observaciones", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}