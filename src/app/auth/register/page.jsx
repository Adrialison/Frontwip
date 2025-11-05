"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    direccion: "",
    telefono: "",
    rol: "cliente",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Submitting registration:", form);

      const response = await register(form);

      console.log("Registration successful:", response);

      alert("¡Registro exitoso!");

      // Redirigir según el rol del usuario
      const userRole = response.data?.user?.rol || form.rol;
      if (userRole === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Registration failed:", err);

      // Mostrar errores específicos
      if (err.response?.data?.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        setError(`Errores de validación:\n${errorMessages}`);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError("Error al registrar el usuario. Verifica la consola.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Registro
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm whitespace-pre-line">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Correo <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="contraseña"
              value={form.contraseña}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
              minLength={6}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 text-white p-2 rounded font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          ¿Ya tienes cuenta? href="/auth/login"{" "}
          <a
            className="text-blue-600
          hover:underline font-medium"
          >
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
