import { useState, useEffect } from "react";
import {
  listarEvaluacionesPsico,
  eliminarEvaluacionPsico,
} from "../../servicios/evaluacionPsico";
import EvaluacionPsicoForm from "./EvaluacionPsicoForm";

function EvaluacionPsicoList() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEval, setSelectedEval] = useState(null);

  const cargarEvaluaciones = async () => {
    setLoading(true);
    try {
      const data = await listarEvaluacionesPsico();
      setEvaluaciones(data);
    } catch (err) {
      console.error(err);
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
      console.error(err);
      alert("❌ Error al eliminar evaluación");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        
        {/* LISTA */}
        <div className="col-md-6">
          <h3 className="mb-3">Evaluaciones Psicopedagógicas</h3>

          {loading ? (
            <div className="alert alert-info">Cargando...</div>
          ) : (
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Eval. Integral</th>
                  <th>Fecha</th>
                  <th>Evaluador</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {evaluaciones.map((ev) => (
                  <tr key={ev.id}>
                    <td>{ev.id}</td>
                    <td>{ev.evaluacion_integral}</td>
                    <td>{ev.fecha || "-"}</td>
                    <td>{ev.evaluador || "-"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => setSelectedEval(ev)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(ev.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* FORM */}
        <div className="col-md-6">
          <h3 className="mb-3">
            {selectedEval ? "Editar evaluación" : "Nueva evaluación"}
          </h3>
          <EvaluacionPsicoForm
            evaluacion={selectedEval}
            onSuccess={() => {
              setSelectedEval(null);
              cargarEvaluaciones();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EvaluacionPsicoList;
