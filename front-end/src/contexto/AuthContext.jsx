// src/contexto/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("loading"); // "loading" | "ready"
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null); // { email, role }

  useEffect(() => {
    // Inicializa desde storage o pide al backend la sesión
    // TODO: reemplazar por GET /session/me (con credentials: 'include') si usas cookies
    const isAuthLS = localStorage.getItem("pie_isAuth") === "true";
    const role = localStorage.getItem("pie_user_role");
    const email = localStorage.getItem("pie_user_email");
    if (isAuthLS) {
      setIsAuth(true);
      setUser({ email: email || "admin@pie.cl", role: role || "Admin" });
    } else {
      setIsAuth(false);
      setUser(null);
    }
    setStatus("ready");
  }, []);

  async function login({ identifier, password }) {
    // TODO: reemplazar por POST /login (credentials: 'include')
    // Valida con backend. Por ahora demo:
    if (!identifier || !password) {
      throw new Error("Credenciales inválidas");
    }
    // Simula éxito:
    localStorage.setItem("pie_isAuth", "true");
    localStorage.setItem("pie_user_role", "Admin"); // o el rol que devuelva tu backend
    localStorage.setItem("pie_user_email", identifier);
    setIsAuth(true);
    setUser({ email: identifier, role: "Admin" });
  }

  async function logout() {
    // TODO: POST /logout (credentials: 'include') y luego limpiar estado
    localStorage.removeItem("pie_isAuth");
    localStorage.removeItem("pie_user_role");
    localStorage.removeItem("pie_user_email");
    setIsAuth(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ status, isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}