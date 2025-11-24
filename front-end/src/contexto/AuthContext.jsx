// src/contexto/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../servicios/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("loading");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function bootstrapSession() {
      try {
        await api.get("/auth/csrf/");
        const { data } = await api.get("/mi-perfil/");
        setIsAuth(true);
        setUser(data);
      } catch {
        setIsAuth(false);
        setUser(null);
      } finally {
        setStatus("ready");
      }
    }
    bootstrapSession();
  }, []);

  async function login({ identifier, password }) {
    try {
      await api.get("/auth/csrf/");
      const { data } = await api.post("/login/", { identifier, password });
      setIsAuth(true);
      setUser(data.user);
      const nombre = data.user.first_name || data.user.username || data.user.email;
      toast.success(`Bienvenido ${nombre}`);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Credenciales inválidas";
      toast.error(message);
      throw new Error(message);
    }
  }

  async function logout() {
    try {
      await api.post("/logout/");
      toast.success("Sesión cerrada");
    } catch (error) {
      toast.warning("La sesión ya estaba cerrada o expiró");
    } finally {
      setIsAuth(false);
      setUser(null);
    }
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