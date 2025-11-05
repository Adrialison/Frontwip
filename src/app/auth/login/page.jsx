"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(correo, contraseña);

      // Obtener el rol del usuario de la respuesta
      const userRole = response.data?.user?.rol;

      // Redirigir según el rol
      if (userRole === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Credenciales incorrectas o error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <label className="block mb-2 text-sm font-medium">Correo</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          disabled={loading}
        />

        <label className="block mb-2 text-sm font-medium">Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-2 rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>

        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/auth/register" className="text-blue-500 underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}
