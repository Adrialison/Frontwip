"use client";
import {
  UserIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <nav className="bg-[#FF6277] text-white text-center p-2 font-semibold">
        <h3>
          Conexión WIP | Cuotas desde 0% de interés con todas las tarjetas de
          crédito.
        </h3>
      </nav>

      {/* Main header */}
      <nav className="bg-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <a
            href="https://flowbite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/images/logos/logo.png"
              className="h-20 w-20"
              alt="Flowbite Logo"
            />
          </a>

          {/* Search */}
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Escribe tu búsqueda..."
              className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DFD4D4]"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <UserIcon className="h-6 w-6 text-[#FD2E4A] cursor-pointer" />
            <ShoppingCartIcon className="h-6 w-6 text-[#FD2E4A] cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Navbar */}
      <nav className="bg-[#FE3776]">
        <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl p-4">
          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:opacity-80 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
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
            className={`w-full md:flex md:w-auto md:order-1 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:mt-0 md:space-x-8">
              {["Home", "Company", "Marketplace", "Resources", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block py-2 px-3 text-white rounded-sm hover:opacity-80 md:p-0"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
      <img
        src="/images/hero/Hero.img.png"
        className="h-full w-full"
        alt="Flowbite Logo"
      />
    </>
  );
}
