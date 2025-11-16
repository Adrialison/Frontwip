"use client";
import {
  UserIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Configuración del menú con rutas
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Celulares", path: "/celulares" },
    { name: "Computadoras", path: "/computadoras" },
    { name: "Accesorios", path: "/accesorios" },
    { name: "Nuestra Tienda", path: "/" },
    { name: "Contact", path: "/" },
  ];

  // Verificar si una ruta está activa
  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Top bar */}
      <nav className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center p-2.5 font-semibold shadow-md">
        <h3 className="text-sm md:text-base">
          Conexión WIP | Cuotas desde 0% de interés con todas las tarjetas de
          crédito.
        </h3>
      </nav>

      {/* Main header */}
      <nav className="bg-white shadow-sm">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse hover:opacity-80 transition"
          >
            <img
              src="/images/logos/logo.png"
              className="h-16 w-16 md:h-20 md:w-20"
              alt="Logo"
            />
          </Link>

          {/* Search */}
          <div className="relative w-full md:w-1/2 order-3 md:order-2">
            <input
              type="text"
              placeholder="Busca celulares, accesorios, computadoras..."
              className="w-full pl-11 pr-4 py-2.5 text-gray-700 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-pink-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6 rtl:space-x-reverse order-2 md:order-3">
            <Link
              href="/perfil"
              className="p-2 hover:bg-pink-50 rounded-full transition"
            >
              <UserIcon className="h-6 w-6 text-pink-600 cursor-pointer" />
            </Link>
            <Link
              href="/carrito"
              className="p-2 hover:bg-pink-50 rounded-full transition relative"
            >
              <ShoppingCartIcon className="h-6 w-6 text-pink-600 cursor-pointer" />
              {/* Badge opcional para cantidad de items */}
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg sticky top-0 z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-white/20 focus:outline-none transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Menu */}
          <div
            className={`w-full md:flex md:w-auto md:justify-center md:flex-1 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 md:mt-0 md:flex-row md:space-x-1 bg-white/10 md:bg-transparent rounded-lg md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`block py-2.5 px-4 rounded-lg font-medium transition-all ${
                      isActive(item.path)
                        ? "bg-white text-pink-600 shadow-md"
                        : "text-white hover:bg-white/20"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Image - Solo mostrar en Home */}
      {pathname === "/" && (
        <div className="relative">
          <img
            src="/images/hero/Hero.img.png"
            className="h-full w-full object-cover"
            alt="Hero Banner"
          />
        </div>
      )}
    </>
  );
}