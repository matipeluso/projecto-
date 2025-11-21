// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Componentes de diseño
import BarraNavegacion from "./componentes/diseno/BarraNavegacion";

// Páginas
import DatosDelSostenedor from "./paginas/Sostenedor/DatosDelSostenedor";
import EstructuraDeCurso from "./paginas/Establecimientos/EstructuraDeCurso";
import AlumnosDelCurso from "./paginas/alumnos/AlumnosDelCurso";
import Login from "./paginas/auth/login";
import PerfilUsuario from "./paginas/perfil/PerfilUsuario";
import RecuperarContrasena from "./paginas/auth/RecuperarContrasena";
import RestablecerContrasena from "./paginas/auth/RestablecerContrasena";

// Nueva página psicopedagógica
import EvaluacionPsicoList from "./paginas/psicopedagogica/EvaluacionPsicoList";
import EvaluacionPsicoLista from "./paginas/psicopedagogica/EvaluacionPsicoLista";
import EvaluacionPsicoForm from "./paginas/psicopedagogica/EvaluacionPsicoForm";
import SaludForm from "./paginas/salud/SaludForm";

// Contexto de autenticación
import { AuthProvider, useAuth } from "./contexto/AuthContext";

// -------------------------------------------------------------
//  RUTA PROTEGIDA
// -------------------------------------------------------------
function ProtectedRoute({ children }) {
  const { isAuth, status } = useAuth();

  // Espera a que el contexto termine de cargar
  if (status !== "ready") return null;

  // Si no está logueado → redirige a login
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}

// -------------------------------------------------------------
//  APP PRINCIPAL
// -------------------------------------------------------------
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BarraNavegacion />

        <main>
          <Routes>
            {/* Redirección según si hay sesión */}
            <Route path="/" element={<HomeRedirect />} />

            {/* Páginas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
            <Route path="/restablecer/:uid/:token" element={<RestablecerContrasena />} />

            {/* ------------------------------------------------------ */}
            {/*            RUTAS PROTEGIDAS (REQUIERE LOGIN)            */}
            {/* ------------------------------------------------------ */}

            {/* Página Psicopedagógica */}
            <Route
              path="/evaluacion-psicopedagogica"
              element={
                <ProtectedRoute>
                  <EvaluacionPsicoList />
                </ProtectedRoute>
              }
            />

            {/* Sostenedor */}
            <Route
              path="/sostenedor"
              element={
                <ProtectedRoute>
                  <DatosDelSostenedor />
                </ProtectedRoute>
              }
            />

            {/* Estructura curso */}
            <Route
              path="/establecimientos/:id/estructura"
              element={
                <ProtectedRoute>
                  <EstructuraDeCurso />
                </ProtectedRoute>
              }
            />

            {/* Alumnos de un curso */}
            <Route
              path="/establecimientos/:id/cursos/:cursoId/alumnos"
              element={
                <ProtectedRoute>
                  <AlumnosDelCurso />
                </ProtectedRoute>
              }
            />

            {/* Perfil */}
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <PerfilUsuario />
                </ProtectedRoute>
              }
            />

            {/* Nueva ruta para el formulario de salud */}
            <Route
              path="/salud"
              element={
                <ProtectedRoute>
                  <SaludForm />
                </ProtectedRoute>
              }
            />

            {/* Rutas protegidas para evaluaciones psicopedagógicas */}
            {/* Página Psicopedagógica - Lista */}
            <Route
              path="/psicopedagogica/evaluaciones"
              element={
                <ProtectedRoute>
                  <EvaluacionPsicoLista />
                </ProtectedRoute>
              }
            />
            {/* Página Psicopedagógica - Crear */}
            <Route
              path="/psicopedagogica/evaluaciones/nueva"
              element={
                <ProtectedRoute>
                  <EvaluacionPsicoForm />
                </ProtectedRoute>
              }
            />
            {/* Página Psicopedagógica - Editar */}
            <Route
              path="/psicopedagogica/evaluaciones/editar/:id"
              element={
                <ProtectedRoute>
                  <EvaluacionPsicoForm />
                </ProtectedRoute>
              }
            />

            {/* Fallback: cualquier ruta inválida vuelve al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

// -------------------------------------------------------------
//  HOME AUTO-REDIRECT SEGÚN SESIÓN
// -------------------------------------------------------------
function HomeRedirect() {
  const { isAuth, status } = useAuth();

  if (status !== "ready") return null;

  return isAuth ? (
    <Navigate to="/sostenedor" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
