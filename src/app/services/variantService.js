// src/services/variantService.js
import { api } from "./api";

// Obtener todas las variantes
export const getVariants = async () => {
  try {
    const response = await api.get("/api/variants");
    console.log("Variants loaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error loading variants:", error);
    throw error;
  }
};

// Obtener una variante por ID
export const getVariantById = async (id) => {
  try {
    const response = await api.get(`/api/variants/${id}`);
    console.log("Variant loaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error loading variant:", error);
    throw error;
  }
};

// Crear una nueva variante
export const createVariant = async (variantData) => {
  try {
    const response = await api.post("/api/variants", variantData);
    console.log("Variant created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating variant:", {
      message: error.message,
      status: error.response?.status,
      errors: error.response?.data?.errors,
      data: error.response?.data,
    });
    throw error;
  }
};

// Actualizar una variante
export const updateVariant = async (id, variantData) => {
  try {
    const response = await api.put(`/api/variants/${id}`, variantData);
    console.log("Variant updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating variant:", {
      message: error.message,
      status: error.response?.status,
      errors: error.response?.data?.errors,
      data: error.response?.data,
    });
    throw error;
  }
};

// Eliminar una variante
export const deleteVariant = async (id) => {
  try {
    const response = await api.delete(`/api/variants/${id}`);
    console.log("Variant deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting variant:", error);
    throw error;
  }
};
