import React, { useEffect, useState } from 'react';
import { getEvaluacionPsico, getEvaluacionPsicoPDF } from '../../servicios/evaluacionPsico';
import { useParams } from 'react-router-dom';

const EvaluacionPsicoDetalle = () => {
  const { id } = useParams();
  const [evaluacion, setEvaluacion] = useState(null);

  useEffect(() => {
    getEvaluacionPsico(id).then(res => setEvaluacion(res.data));
  }, [id]);

  const handleDownloadPDF = () => {
    getEvaluacionPsicoPDF(id).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `evaluacion_psico_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  if (!evaluacion) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalle Evaluación Psicopedagógica</h2>
      <p><strong>Estudiante:</strong> {evaluacion.estudiante_nombres_apellidos || evaluacion.estudiante?.nombres_apellidos}</p>
      <p><strong>Fecha:</strong> {evaluacion.fecha}</p>
      <p><strong>Observaciones:</strong> {evaluacion.observaciones}</p>
      <p><strong>Evaluador:</strong> {evaluacion.evaluador}</p>
      {/* Aquí puedes mostrar subdimensiones, subsectores, estrategias y apoyos adicionales */}
      <button onClick={handleDownloadPDF}>Descargar PDF</button>
    </div>
  );
};

export default EvaluacionPsicoDetalle;
