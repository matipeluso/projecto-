// src/services/auth.service.js
import api from "./api";

// Cambia esto a false cuando el back esté listo
const USE_MOCK = true;

const mockUserAdmin = {
  id: 1,
  username: "admin",
  email: "admin@colegio.cl",
  first_name: "Admin",
  last_name: "PIE",
  roles: ["admin"],       // clave para ProtectedRoute
  tipo: "Interno",
  especialidad: null,
  establecimiento: null,
};

export async function login({ identifier, password }) {
  if (USE_MOCK) {
    // Simula call al back
    if (identifier === "admin@colegio.cl" && password === "123456") {
      return { user: mockUserAdmin };
    }
    const err = new Error("Credenciales inválidas");
    err.response = { data: { message: "Credenciales inválidas" } };
    throw err;
  }
  const { data } = await api.post("/auth/login", { identifier, password });
  return data; // { user }
}

export async function getMe() {
  if (USE_MOCK) {
    return { user: mockUserAdmin };
  }
  const { data } = await api.get("/auth/me");
  return data;
}

export async function logout() {
  if (USE_MOCK) return;
  try {
    await api.post("/auth/logout");
  } catch {}
}
