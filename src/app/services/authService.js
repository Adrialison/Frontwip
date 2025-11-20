import { api } from "./api";

export const login = async (correo, contraseña) => {
  try {
    const { data } = await api.post("/api/login", { correo, contraseña });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.usuario) {
      localStorage.setItem("user", JSON.stringify(data.usuario));
    }

    console.log("Login successful:", data);
    return data;
  } catch (error) {
    console.error("Login error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

export const register = async (userData) => {
  try {
    console.log("Registering user:", userData);

    const { data } = await api.post("/api/register", userData);

    console.log("Register response:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.usuario) {
      localStorage.setItem("user", JSON.stringify(data.usuario));
    }

    return data;
  } catch (error) {
    console.error("Register error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      errors: error.response?.data?.errors,
    });
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No hay token para cerrar sesión.");
      return;
    }

    await api.post(
      "/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
