import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// NO establezcas Content-Type aquí, axios lo hace automáticamente para FormData

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 419) {
      console.error("CSRF token mismatch:", error.response?.data);
    }

    // Debug completo del error
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });

    return Promise.reject(error);
  }
);
