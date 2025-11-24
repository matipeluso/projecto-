import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user: usuario, logout } = useAuth();

  if (!usuario) return null;

  const displayName = [usuario.first_name, usuario.last_name].filter(Boolean).join(" ")
    || usuario.username
    || usuario.email;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Opciones de navegación según permisos
  let links = [];
  links.push({ to: "/usuarios", label: "Usuarios" });
  if (usuario.is_superuser) {
    links = links.concat([
      { to: "/establecimientos", label: "Establecimientos" },
      { to: "/cursos", label: "Cursos" },
      { to: "/estudiantes", label: "Estudiantes" },
      { to: "/apoderados", label: "Apoderados" },
      { to: "/registro-pie", label: "Registro PIE" },
      { to: "/evaluacion-psicopedagogica", label: "Evaluación Psicopedagógica" },
      { to: "/evaluacion-salud", label: "Evaluación de Salud" },
      { to: "/informes-familia", label: "Informes para la familia" },
    ]);
  } else if (usuario.is_staff) {
    links = links.concat([
      { to: "/establecimientos", label: "Establecimientos" },
      { to: "/cursos", label: "Cursos" },
      { to: "/estudiantes", label: "Estudiantes" },
      { to: "/apoderados", label: "Apoderados" },
      { to: "/registro-pie", label: "Registro PIE" },
      { to: "/evaluacion-psicopedagogica", label: "Evaluación Psicopedagógica" },
      { to: "/evaluacion-salud", label: "Evaluación de Salud" },
      { to: "/informes-familia", label: "Informes para la familia" },
    ]);
  } else if (usuario.tipo === "Interno") {
    links = links.concat([
      { to: "/evaluacion-psicopedagogica", label: "Evaluación Psicopedagógica" },
      { to: "/evaluacion-salud", label: "Evaluación de Salud" },
      { to: "/registro-pie", label: "Registro PIE" },
      { to: "/estudiantes", label: "Estudiantes" },
      { to: "/apoderados", label: "Apoderados" },
    ]);
  } else if (usuario.tipo === "Externo") {
    links = links.concat([
      { to: "/evaluacion-salud", label: "Evaluación de Salud asignada" },
      { to: "/informes-familia", label: "Informes para la familia" },
    ]);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Plataforma Sostenedor
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <Link className="nav-link" to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3 text-white">
              <span className="fw-semibold">
                <i className="bi bi-person-circle me-1"></i>
                {displayName}
                <span className="badge bg-light text-dark ms-2">
                  {usuario.is_superuser ? "Administrador" : usuario.is_staff ? "Staff" : usuario.tipo}
                </span>
                {usuario.especialidad?.nombre && (
                  <span className="badge bg-info text-dark ms-2">{usuario.especialidad.nombre}</span>
                )}
                {usuario.establecimiento?.nombre && (
                  <span className="badge bg-secondary text-light ms-2">{usuario.establecimiento.nombre}</span>
                )}
              </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
