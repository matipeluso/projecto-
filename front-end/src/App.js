// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BarraNavegacion from "./componentes/diseno/BarraNavegacion";
import DatosDelSostenedor from "./paginas/Sostenedor/DatosDelSostenedor";
import EstructuraDeCurso from "./paginas/Establecimientos/EstructuraDeCurso";
import AlumnosDelCurso from "./paginas/alumnos/AlumnosDelCurso";
import Login from "./paginas/auth/login";
import PerfilUsuario from "./paginas/perfil/PerfilUsuario";
import RecuperarContrasena from "./paginas/auth/RecuperarContrasena";      // 👈 IMPORTA
import RestablecerContrasena from "./paginas/auth/RestablecerContrasena";  // 👈 IMPORTA
import { AuthProvider, useAuth } from "./contexto/AuthContext";

// 👇 Módulo Usuarios
import Usuarios from "./paginas/usuarios/Usuarios";

function ProtectedRoute({ children }) {
  const { isAuth, status } = useAuth();
  if (status !== "ready") return null;
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BarraNavegacion />
        <main>
          <Routes>
            {/* Home decide según sesión */}
            <Route path="/" element={<HomeRedirect />} />

            {/* Público */}
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />      {/* 👈 ESTA */}
            <Route path="/restablecer/:uid/:token" element={<RestablecerContrasena />} /> {/* 👈 ESTA */}

            {/* Protegidas */}
            <Route
              path="/sostenedor"
              element={
                <ProtectedRoute>
                  <DatosDelSostenedor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/establecimientos/:id/estructura"
              element={
                <ProtectedRoute>
                  <EstructuraDeCurso />
                </ProtectedRoute>
              }
            />
            <Route
              path="/establecimientos/:id/cursos/:cursoId/alumnos"
              element={
                <ProtectedRoute>
                  <AlumnosDelCurso />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <PerfilUsuario />
                </ProtectedRoute>
              }
            />

            {/* 👇 NUEVA RUTA PROTEGIDA: Usuarios */}
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute>
                  <Usuarios />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

function HomeRedirect() {
  const { isAuth, status } = useAuth();
  if (status !== "ready") return null;
  return isAuth ? <Navigate to="/sostenedor" replace /> : <Navigate to="/login" replace />;
}