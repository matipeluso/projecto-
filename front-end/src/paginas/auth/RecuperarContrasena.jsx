// src/paginas/auth/RecuperarContrasena.jsx
import { useState } from "react";
import api from "../../servicios/api";

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      // ✅ Llamada real al backend
      await api.post("/auth/password-reset/", { email });

      // Siempre mensaje genérico (no revelar si el correo existe)
      setEnviado(true);
      setMensaje("Si el correo existe, te enviaremos un enlace para restablecer la contraseña.");
    } catch (err) {
      // También mensaje genérico en error
      setEnviado(true);
      setMensaje("Si el correo existe, te enviaremos un enlace para restablecer la contraseña.");
      // (Opcional) muestra en consola para debug local:
      // console.error(err?.response || err);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow" style={{ maxWidth: 420, width: "100%" }}>
        <div className="card-body p-4">
          <h4 className="mb-3 text-center">Recuperar contraseña</h4>
          <p className="text-muted small">
            Ingresa tu correo y te enviaremos un enlace para crear una nueva contraseña.
          </p>

          {mensaje && <div className="alert alert-info">{mensaje}</div>}

          {!enviado && (
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="usuario@colegio.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" disabled={cargando}>
                {cargando ? "Enviando..." : "Enviar enlace"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}