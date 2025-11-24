import React, { useMemo, useRef } from "react";

/**
 * EquipoAula (models.EquipoAula)
 * Campos: nombre, rol, telefono, correo (+ registro FK)
 */
export default function EquipoAulaSection({ registroId, items, setItems, onSave, onDelete, usuarios = [] }) {
  const formRef = useRef(null);

  const opcionesUsuarios = useMemo(
    () =>
      usuarios.map((usuario) => {
        const nombre = [usuario.first_name, usuario.last_name].filter(Boolean).join(" ") || usuario.username;
        const especialidad = usuario.especialidad?.nombre ?? usuario.especialidad ?? "";
        return {
          value: String(usuario.id),
          label: `${nombre}${especialidad ? ` — ${especialidad}` : ""}`,
          correo: usuario.email || "",
          telefono: usuario.telefono || "",
          nombre,
        };
      }),
    [usuarios]
  );

  const handleUsuarioSelect = (event) => {
    if (!formRef.current) return;
    const seleccion = opcionesUsuarios.find((opt) => opt.value === event.target.value);
    if (!seleccion) return;
    formRef.current.nombre.value = seleccion.nombre;
    if (formRef.current.telefono) {
      formRef.current.telefono.value = seleccion.telefono;
    }
    if (formRef.current.correo) {
      formRef.current.correo.value = seleccion.correo;
    }
  };
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Equipo de Aula</h5>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => onSave(items)}>
          Guardar sección
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th style={{ width: 140 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No hay integrantes agregados.
                </td>
              </tr>
            )}
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.rol}</td>
                <td>{p.telefono}</td>
                <td>{p.correo}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary">Editar</button>
                    <button className="btn btn-outline-danger" onClick={() => onDelete(p.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        ref={formRef}
        className="row g-3 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const f = e.currentTarget;
          const nuevo = {
            id: `temp-${Date.now()}`,
            nombre: f.nombre.value.trim(),
            rol: f.rol.value,
            telefono: f.telefono.value.trim(),
            correo: f.correo.value.trim(),
            registro: registroId ?? null,
          };
          setItems((prev) => [...prev, nuevo]);
          f.reset();
        }}
      >
        <div className="col-md-4">
          <label className="form-label">Profesional registrado</label>
          <select name="usuario_id" className="form-select" onChange={handleUsuarioSelect}>
            <option value="">Seleccione un usuario…</option>
            {opcionesUsuarios.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Nombre</label>
          <input name="nombre" className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Rol</label>
          <select name="rol" className="form-select" required>
            <option value="">Seleccione…</option>
            <option>Profesor Regular</option>
            <option>Educador Diferencial</option>
            <option>Psicólogo</option>
            <option>Fonoaudiólogo</option>
            <option>Terapeuta Ocupacional</option>
            <option>Asistente de Aula</option>
            <option>Coordinador PIE</option>
            <option>Otro</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Teléfono</label>
          <input name="telefono" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Correo</label>
          <input type="email" name="correo" className="form-control" />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success btn-sm">Agregar integrante</button>
        </div>
      </form>
    </section>
  );
}