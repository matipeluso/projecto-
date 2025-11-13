// src/paginas/auth/RestablecerContrasena.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../servicios/api";

export default function RestablecerContrasena() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [clave1, setClave1] = useState("");
  const [clave2, setClave2] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (clave1 !== clave2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (clave1.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setCargando(true);
    try {
      // ✅ Llamada real al backend
      await api.post("/auth/password-reset-confirm/", {
        uid,
        token,
        new_password: clave1, // el backend debe recibir "new_password"
      });

      setOk("Tu contraseña se actualizó correctamente. Te estamos redirigiendo al inicio de sesión...");
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      const msg = err?.response?.data?.message || "El enlace no es válido o expiró.";
      setError(msg);
      // console.error(err?.response || err);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow" style={{ maxWidth: 420, width: "100%" }}>
        <div className="card-body p-4">
          <h4 className="mb-3 text-center">Crear nueva contraseña</h4>

          {error && <div className="alert alert-danger">{error}</div>}
          {ok && <div className="alert alert-success">{ok}</div>}

          {!ok && (
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Nueva contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={clave1}
                  onChange={(e) => setClave1(e.target.value)}
                  required
                />
                <div className="form-text">Mínimo 8 caracteres.</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={clave2}
                  onChange={(e) => setClave2(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" disabled={cargando}>
                {cargando ? "Guardando..." : "Actualizar contraseña"}
              </button>
            </form>
          )}

          {/* Debug opcional */}
          <p className="text-muted small mt-3">
            <strong>Debug:</strong> uid=<code>{uid}</code> token=<code>{token}</code>
          </p>
        </div>
      </div>
    </div>
  );
}