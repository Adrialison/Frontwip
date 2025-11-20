"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout, getCurrentUser } from "../services/authService";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard Admin</h2>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block p-2 rounded hover:bg-gray-700 transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/products"
                className="block p-2 rounded hover:bg-gray-700 transition-colors"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/categories"
                className="block p-2 rounded hover:bg-gray-700 transition-colors"
              >
                Categorías
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/brands"
                className="block p-2 rounded hover:bg-gray-700 transition-colors"
              >
                Marcas
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/variants"
                className="block p-2 rounded hover:bg-gray-700 transition-colors"
              >
                Variantes
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="w-full bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Bienvenido{user ? `, ${user.nombre}` : ""}
          </h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </header>

        {/* CONTENIDO */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
