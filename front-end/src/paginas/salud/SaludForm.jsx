import React, { useState, useEffect } from 'react';
import { crearAntecedenteSalud, actualizarAntecedenteSalud } from '../../servicios/salud';
import { listarEstudiantes } from '../../servicios/estudiantes';
import { listarCursos } from '../../servicios/cursos';
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
  const [cursos, setCursos] = useState([]);
  const [cargandoCursos, setCargandoCursos] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(
    antecedente?.anamnesis?.estudiante?.curso?.id ? String(antecedente.anamnesis.estudiante.curso.id) : ''
  );
  const [estudiantes, setEstudiantes] = useState([]);
  const [cargandoEstudiantes, setCargandoEstudiantes] = useState(false);
  const [alerta, setAlerta] = useState({ show: false, mensaje: '', variante: 'success' });
  const [form, setForm] = useState({
    anamnesis: anamnesisId || '',
    estudiante_id: antecedente?.anamnesis?.estudiante?.id || '',
    motivo_consulta: antecedente?.motivo_consulta || '',
    profesional: '', // Se setea en useEffect
    especialidad: '', // Se setea en useEffect
    rut_profesional: antecedente?.rut_profesional || '',
    cargo_profesional: antecedente?.cargo_profesional || '',
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
      profesional: user?.id || '',
      especialidad: user?.especialidad?.nombre || 'Sin especialidad',
      rut_profesional: user?.rut || '',
      cargo_profesional: user?.cargo || user?.especialidad?.nombre || '',
    }));
  }, [user]);

  useEffect(() => {
    const cargarCursos = async () => {
      setCargandoCursos(true);
      try {
        const { data } = await listarCursos();
        const items = Array.isArray(data) ? data : data?.results ?? [];
        setCursos(items);
      } catch (error) {
        console.error('[SaludForm] Error cargando cursos', error);
        setAlerta({ show: true, mensaje: 'No se pudieron cargar los cursos. Intenta nuevamente.', variante: 'danger' });
      } finally {
        setCargandoCursos(false);
      }
    };
    cargarCursos();
  }, []);

  useEffect(() => {
    const cargarEstudiantes = async () => {
      if (!cursoSeleccionado) {
        setEstudiantes([]);
        setForm(f => ({ ...f, estudiante_id: '' }));
        return;
      }
      setCargandoEstudiantes(true);
      try {
        const { data } = await listarEstudiantes({ curso: cursoSeleccionado });
        const items = Array.isArray(data) ? data : data?.results ?? [];
        setEstudiantes(items);
      } catch (error) {
        console.error('[SaludForm] Error cargando estudiantes', error);
        setAlerta({ show: true, mensaje: 'No se pudieron cargar los estudiantes del curso. Intenta nuevamente.', variante: 'danger' });
      } finally {
        setCargandoEstudiantes(false);
      }
    };
    cargarEstudiantes();
  }, [cursoSeleccionado]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'curso_id') {
      setCursoSeleccionado(value);
      setForm((prev) => ({ ...prev, estudiante_id: '' }));
      return;
    }
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.estudiante_id && !form.anamnesis) {
      setAlerta({ show: true, mensaje: 'Debes seleccionar un curso y un estudiante antes de guardar.', variante: 'warning' });
      return;
    }
    try {
      const payload = { ...form };
      if (!payload.anamnesis) delete payload.anamnesis;
      if (payload.estudiante_id === '') delete payload.estudiante_id;
      payload.profesional = user?.id || form.profesional || null;
      payload.especialidad = user?.especialidad?.nombre || 'Sin especialidad';
      payload.rut_profesional = user?.rut || form.rut_profesional || '';
      payload.cargo_profesional = user?.cargo || form.cargo_profesional || payload.especialidad;
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
        <label>Curso</label>
        <select
          className="form-select"
          name="curso_id"
          value={cursoSeleccionado}
          onChange={handleChange}
          disabled={cargandoCursos}
        >
          <option value="">{cargandoCursos ? 'Cargando cursos...' : 'Seleccione un curso'}</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
              {curso?.establecimiento?.nombre ? ` – ${curso.establecimiento.nombre}` : ''}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Estudiante</label>
        <select
          className="form-select"
          name="estudiante_id"
          value={form.estudiante_id}
          onChange={handleChange}
          disabled={!cursoSeleccionado || cargandoEstudiantes}
        >
          <option value="">
            {!cursoSeleccionado ? 'Selecciona un curso primero' : cargandoEstudiantes ? 'Cargando estudiantes...' : 'Seleccione un estudiante'}
          </option>
          {estudiantes.map((est) => (
            <option key={est.id} value={est.id}>
              {est.nombres_apellidos}
              {est?.curso?.nombre ? ` – ${est.curso.nombre}` : ''}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Motivo de consulta</label>
        <input type="text" className="form-control" name="motivo_consulta" value={form.motivo_consulta} onChange={handleChange} />
      </div>
      <h4>2. Identificación del profesional</h4>
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Nombre profesional</label>
          <input type="text" className="form-control" value={`${user?.first_name || ''} ${user?.last_name || ''}`.trim()} disabled />
        </div>
        <div className="col-md-3">
          <label>RUT</label>
          <input type="text" className="form-control" value={user?.rut || form.rut_profesional || ''} disabled />
        </div>
        <div className="col-md-3">
          <label>Cargo / Rol</label>
          <input type="text" className="form-control" value={user?.cargo || form.cargo_profesional || ''} disabled />
        </div>
        <div className="col-md-3">
          <label>Especialidad</label>
          <input type="text" className="form-control" value={user?.especialidad?.nombre || form.especialidad || 'Sin especialidad'} disabled />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Procedencia</label>
          <input type="text" className="form-control" name="procedencia" value={form.procedencia} onChange={handleChange} />
        </div>
        <div className="col-md-6">
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
