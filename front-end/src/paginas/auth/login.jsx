// src/paginas/auth/login.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // 👈 Link
import { useAuth } from "../../contexto/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState(""); // email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Si venías de una ruta protegida, redirige allí después del login
  const from = location.state?.from?.pathname || "/sostenedor";

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      await login({ identifier, password });
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || "Credenciales inválidas";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow" style={{ maxWidth: 420, width: "100%" }}>
        <div className="card-body p-4">
          <h4 className="mb-3 text-center">Ingresa al sistema</h4>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="usuario@colegio.cl"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            {/* 🔗 Recuperar contraseña */}
            <div className="text-center mt-3">
              <Link to="/recuperar-contrasena" className="small">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>

          <p className="text-muted small mt-3">
            Acceso único. El sistema reconocerá tu perfil (Admin u otro) automáticamente según tu usuario.
          </p>
        </div>
      </div>
    </div>
  );
}