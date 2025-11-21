import React, { useState, useEffect } from 'react';
import { crearAntecedenteSalud, actualizarAntecedenteSalud } from '../../servicios/salud';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../contexto/AuthContext';

const TIPO_PARTO_OPCIONES = [
  { value: '', label: 'Seleccione tipo de parto' },
  { value: 'Vaginal', label: 'Vaginal' },
  { value: 'Cesárea', label: 'Cesárea' },
  { value: 'Instrumental', label: 'Instrumental' },
  { value: 'No especifica', label: 'No especifica' },
];

const SaludForm = ({ modo = 'crear', antecedente = null, anamnesisId }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    anamnesis: anamnesisId || '',
    motivo_consulta: antecedente?.motivo_consulta || '',
    profesional: '', // Se setea en useEffect
    especialidad: '', // Se setea en useEffect
    procedencia: antecedente?.procedencia || '',
    contacto: antecedente?.contacto || '',
    fecha_evaluacion: antecedente?.fecha_evaluacion || '',
    fecha_reevaluacion: antecedente?.fecha_reevaluacion || '',
    estado_salud_general: antecedente?.estado_salud_general || '',
    descripcion_diagnostico: antecedente?.descripcion_diagnostico || '',
    indicaciones: antecedente?.indicaciones || '',
    diagnostico_prev: antecedente?.diagnostico_prev || '',
    tipo_parto: antecedente?.tipo_parto || '',
    asistencia_parto: antecedente?.asistencia_parto || false,
    peso: antecedente?.peso || '',
    talla: antecedente?.talla || '',
    antecedentes_embarazo: antecedente?.antecedentes_embarazo || '',
    hospitalizaciones: antecedente?.hospitalizaciones || false,
    vacunas: antecedente?.vacunas ?? true,
    observaciones: antecedente?.observaciones || '',
  });

  useEffect(() => {
    // Simulación: profesional es el ID del usuario logueado, especialidad es el texto
    // En producción, deberías obtener el ID real del usuario desde backend
    setForm(f => ({
      ...f,
      profesional: user?.id || 1, // Cambia por el ID real si lo tienes
      especialidad: user?.especialidad || 'Sin especialidad',
    }));
  }, [user]);

  const [alerta, setAlerta] = useState({ show: false, mensaje: '', variante: 'success' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      // profesional debe ser el ID
      payload.profesional = user?.id || 1;
      payload.especialidad = user?.especialidad || 'Sin especialidad';
      if (modo === 'crear') {
        await crearAntecedenteSalud(payload);
        setAlerta({ show: true, mensaje: 'Registro creado exitosamente.', variante: 'success' });
      } else {
        await actualizarAntecedenteSalud(antecedente.id, payload);
        setAlerta({ show: true, mensaje: 'Registro actualizado exitosamente.', variante: 'success' });
      }
    } catch (error) {
      setAlerta({ show: true, mensaje: 'Error al guardar: ' + (error.response?.data?.detail || error.message), variante: 'danger' });
    }
  };

  return (
    <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
      <h4>1. Identificación del estudiante</h4>
      <div className="mb-3">
        <label>Motivo de consulta</label>
        <input type="text" className="form-control" name="motivo_consulta" value={form.motivo_consulta} onChange={handleChange} />
      </div>
      <h4>2. Identificación del profesional</h4>
      <div className="row mb-3">
        <div className="col">
          <label>Nombre profesional</label>
          <input type="text" className="form-control" name="profesional" value={user?.first_name + ' ' + user?.last_name || ''} disabled />
        </div>
        <div className="col">
          <label>Especialidad</label>
          <input type="text" className="form-control" name="especialidad" value={user?.especialidad || 'Sin especialidad'} disabled />
        </div>
        <div className="col">
          <label>Procedencia</label>
          <input type="text" className="form-control" name="procedencia" value={form.procedencia} onChange={handleChange} />
        </div>
        <div className="col">
          <label>Contacto</label>
          <input type="text" className="form-control" name="contacto" value={form.contacto} onChange={handleChange} />
        </div>
      </div>
      <h4>3. Examen del estado general</h4>
      <div className="row mb-3">
        <div className="col">
          <label>Fecha evaluación</label>
          <input type="date" className="form-control" name="fecha_evaluacion" value={form.fecha_evaluacion} onChange={handleChange} />
        </div>
        <div className="col">
          <label>Fecha reevaluación</label>
          <input type="date" className="form-control" name="fecha_reevaluacion" value={form.fecha_reevaluacion} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <label>Estado de salud general</label>
        <textarea className="form-control" name="estado_salud_general" value={form.estado_salud_general} onChange={handleChange} />
      </div>
      <h4>4. Antecedentes de salud</h4>
      <div className="row mb-3">
        <div className="col">
          <label>Diagnóstico previo</label>
          <input type="text" className="form-control" name="diagnostico_prev" value={form.diagnostico_prev} onChange={handleChange} />
        </div>
        <div className="col">
          <label>Tipo de parto</label>
          <select className="form-select" name="tipo_parto" value={form.tipo_parto} onChange={handleChange}>
            {TIPO_PARTO_OPCIONES.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Asistencia parto</label>
          <input type="checkbox" className="form-check-input ms-2" name="asistencia_parto" checked={form.asistencia_parto} onChange={handleChange} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label>Peso (kg)</label>
          <input type="number" className="form-control" name="peso" value={form.peso} onChange={handleChange} />
        </div>
        <div className="col">
          <label>Talla (cm)</label>
          <input type="number" className="form-control" name="talla" value={form.talla} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <label>Antecedentes de embarazo</label>
        <textarea className="form-control" name="antecedentes_embarazo" value={form.antecedentes_embarazo} onChange={handleChange} />
      </div>
      <div className="row mb-3">
        <div className="col">
          <label>Hospitalizaciones</label>
          <input type="checkbox" className="form-check-input ms-2" name="hospitalizaciones" checked={form.hospitalizaciones} onChange={handleChange} />
        </div>
        <div className="col">
          <label>Vacunas al día</label>
          <input type="checkbox" className="form-check-input ms-2" name="vacunas" checked={form.vacunas} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <label>Observaciones</label>
        <textarea className="form-control" name="observaciones" value={form.observaciones} onChange={handleChange} />
      </div>
      <h4>5. Diagnóstico</h4>
      <div className="mb-3">
        <label>Descripción diagnóstico</label>
        <textarea className="form-control" name="descripcion_diagnostico" value={form.descripcion_diagnostico} onChange={handleChange} />
      </div>
      <h4>6. Indicaciones</h4>
      <div className="mb-3">
        <label>Indicaciones</label>
        <textarea className="form-control" name="indicaciones" value={form.indicaciones} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
      {alerta.show && <Alert variant={alerta.variante} className="mt-3">{alerta.mensaje}</Alert>}
    </form>
  );
};

export default SaludForm;
