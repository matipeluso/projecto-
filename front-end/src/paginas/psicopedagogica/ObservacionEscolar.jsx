import React from "react";

const CATEGORIAS = [
  { value: "academico", label: "Antecedentes académicos" },
  { value: "social", label: "Antecedentes sociales y comunicativos" },
];

const VALORES = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 0, label: "0" },
];

export default function ObservacionEscolar({
  data,
  onFieldChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  disabled = false,
}) {
  const observacion = data || {};
  const items = observacion.items || [];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFieldChange?.(name, value);
  };

  const handleItemChange = (index, field, value) => {
    let parsedValue = value;
    if (field === "valor") {
      parsedValue = value === "" ? null : Number(value);
    }
    onItemChange?.(index, { [field]: parsedValue });
  };

  return (
    <div className="bg-white py-4">
      <div className="container">
        <div className="border rounded p-4 shadow-sm">
          <header className="mb-4">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <p className="text-uppercase small mb-0">Ley 20.201 – Decreto 170/2009</p>
                <p className="text-uppercase small mb-1">Evaluación Psicopedagógica y Curricular</p>
                <h5 className="fw-bold mb-0">Observación Cualitativa del Estudiante</h5>
              </div>
              <div className="bg-secondary text-white px-3 py-2 fw-bold rounded">F. Observación en terreno</div>
            </div>
            <p className="mt-3 mb-0">
              Registre los datos del profesional que realiza la observación y describa los hallazgos más relevantes en el aula o
              contexto de convivencia. Esta información complementa la pauta cuantitativa.
            </p>
          </header>

          <section className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">Fecha (registro)</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={observacion.fecha || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nombre evaluador(a)</label>
              <input
                type="text"
                className="form-control"
                name="nombre_evaluador"
                value={observacion.nombre_evaluador || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">RUT</label>
              <input
                type="text"
                className="form-control"
                name="rut_evaluador"
                value={observacion.rut_evaluador || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Rol / Cargo</label>
              <input
                type="text"
                className="form-control"
                name="rol_cargo"
                value={observacion.rol_cargo || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Especialidad</label>
              <input
                type="text"
                className="form-control"
                name="especialidad"
                value={observacion.especialidad || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Fecha observación</label>
              <input
                type="date"
                className="form-control"
                name="fecha_observacion"
                value={observacion.fecha_observacion || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Lugar (aula, patio, otro)</label>
              <input
                type="text"
                className="form-control"
                name="lugar"
                value={observacion.lugar || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Lugar detallado</label>
              <input
                type="text"
                className="form-control"
                name="lugar_detallado"
                value={observacion.lugar_detallado || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Firma</label>
              <input
                type="text"
                className="form-control"
                name="firma"
                value={observacion.firma || ""}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
          </section>

          <section className="mb-3">
            <div className="d-flex flex-wrap gap-2 mb-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => onAddItem?.("academico")}
                disabled={disabled}
              >
                Agregar antecedente académico
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => onAddItem?.("social")}
                disabled={disabled}
              >
                Agregar antecedente social/comunicativo
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light text-center">
                  <tr>
                    <th style={{ width: "40px" }}>N°</th>
                    <th style={{ width: "220px" }}>Categoría</th>
                    <th>Descripción</th>
                    <th style={{ width: "100px" }}>Valor</th>
                    <th style={{ width: "80px" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">
                        No hay registros aún. Utiliza los botones para agregar antecedentes.
                      </td>
                    </tr>
                  )}
                  {items.map((item, index) => (
                    <tr key={`${item.numero || index}-${item.categoria}`}>
                      <td className="text-center">{item.numero || index + 1}</td>
                      <td>
                        <select
                          className="form-select"
                          value={item.categoria || "academico"}
                          onChange={(event) => handleItemChange(index, "categoria", event.target.value)}
                          disabled={disabled}
                        >
                          {CATEGORIAS.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          rows={2}
                          value={item.descripcion || ""}
                          onChange={(event) => handleItemChange(index, "descripcion", event.target.value)}
                          disabled={disabled}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select"
                          value={Number.isInteger(item.valor) ? item.valor : ""}
                          onChange={(event) => handleItemChange(index, "valor", event.target.value)}
                          disabled={disabled}
                        >
                          <option value="">-</option>
                          {VALORES.map((opcion) => (
                            <option key={opcion.value} value={opcion.value}>
                              {opcion.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onRemoveItem?.(index)}
                          disabled={disabled}
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="text-muted small text-center">
            Este resumen se incluye en el informe final y respalda la información recabada en terreno.
          </footer>
        </div>
      </div>
    </div>
  );
}
