import { api } from "./api";

// Crear marca (con CSRF cookie)
export const createBrand = async (data) => {
  try {
    // 1. Obtener cookie CSRF
    await api.get("/sanctum/csrf-cookie");

    // 2. Hacer la petición POST
    const res = await api.post("/api/brands", data);
    return res.data;
  } catch (error) {
    console.error("Error creating brand:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    throw error;
  }
};

// Obtener todas las marcas
export const getBrands = async () => {
  const res = await api.get("/api/brands");
  return res.data;
};

// Actualizar marca
export const updateBrand = async (id, data) => {
  await api.get("/sanctum/csrf-cookie");
  const res = await api.put(`/api/brands/${id}`, data);
  return res.data;
};

// Eliminar marca
export const deleteBrand = async (id) => {
  await api.get("/sanctum/csrf-cookie");
  const res = await api.delete(`/api/brands/${id}`);
  return res.data;
};
