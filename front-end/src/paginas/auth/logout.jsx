import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await logout(); // si es async; si no, igual sirve
      } finally {
        navigate("/login", { replace: true });
      }
    })();
  }, [logout, navigate]);

  return null; // o un spinner si quieres
}