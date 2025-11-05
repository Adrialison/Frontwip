// src/app/LayoutContent.jsx
"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Importación dinámica - solo se cargan cuando se necesitan
const Header = dynamic(() => import("./componentes/header.jsx"), {
  ssr: true,
});

const Footer = dynamic(() => import("./componentes/footer.jsx"), {
  ssr: true,
});

export default function LayoutContent({ children }) {
  const pathname = usePathname();

  // Rutas que NO deben mostrar Header y Footer
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname?.startsWith("/auth");

  // Si es dashboard o auth, solo retornar children SIN importar nada
  if (isDashboard || isAuth) {
    return <>{children}</>;
  }

  // Para todas las demás rutas, mostrar Header y Footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
