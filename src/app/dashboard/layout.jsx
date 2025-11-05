// src/app/dashboard/layout.jsx
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
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

        {/* Contenido principal */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
