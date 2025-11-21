import React, { useState, useEffect } from "react";
import { listarEvaluacionesPsico, eliminarEvaluacionPsico } from "../../servicios/evaluacionPsico";
import { useNavigate } from "react-router-dom";

function EvaluacionPsicoLista() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarEvaluaciones = async () => {
    setLoading(true);
    try {
      const data = await listarEvaluacionesPsico();
      setEvaluaciones(data);
    } catch (err) {
      alert("❌ Error al cargar evaluaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEvaluaciones();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar la evaluación?")) return;
    try {
      await eliminarEvaluacionPsico(id);
      cargarEvaluaciones();
    } catch (err) {
      alert("❌ Error al eliminar evaluación");
    }
  };

  const handleVer = (id) => {
    navigate(`/psicopedagogica/evaluaciones/${id}`);
  };

  const handleEditar = (id) => {
    navigate(`/psicopedagogica/evaluaciones/editar/${id}`);
  };

  const handlePDF = (id) => {
    window.open(`/api/psico/evaluaciones/${id}/pdf/`, "_blank");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Evaluaciones Psicopedagógicas</h3>
      {loading ? (
        <div className="alert alert-info">Cargando...</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Alumno</th>
              <th>Curso</th>
              <th>Fecha</th>
              <th>Evaluador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.id}</td>
                <td>{ev.estudiante?.nombres_apellidos || "-"}</td>
                <td>{ev.estudiante?.curso?.nombre || "-"}</td>
                <td>{ev.fecha || "-"}</td>
                <td>{ev.evaluador || "-"}</td>
                <td>
                  <button className="btn btn-sm btn-info me-2" onClick={() => handleVer(ev.id)}>
                    Ver
                  </button>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditar(ev.id)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(ev.id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={() => handlePDF(ev.id)}>
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EvaluacionPsicoLista;
