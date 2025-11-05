import { api } from "./api";

const API_URL = "/api/products";

export const getProducts = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error loading products:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const res = await api.get("/api/categories");
    return res.data;
  } catch (error) {
    console.error("Error loading categories:", error);
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const res = await api.get("/api/brands");
    return res.data;
  } catch (error) {
    console.error("Error loading brands:", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    const res = await api.post(API_URL, formData);
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    formData.append("_method", "PUT");
    const res = await api.post(`${API_URL}/${id}`, formData);
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
