"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bienvenido al Dashboard 🎉</h1>
      <p className="mt-3 text-gray-700">
        Aquí podrás gestionar tus productos, categorías, marcas y variantes.
      </p>
    </div>
  );
}
