"use client";
import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" });

  const fetchData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateCategory(editing.idCategory, formData);
    } else {
      await createCategory(formData);
    }
    setModalOpen(false);
    setEditing(null);
    setFormData({ nombre: "", descripcion: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta categoría?")) {
      await deleteCategory(id);
      fetchData();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Nueva Categoría
        </button>
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Descripción</th>
            <th className="p-3 border text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.idCategory}>
              <td className="p-3 border">{cat.nombre}</td>
              <td className="p-3 border">{cat.descripcion}</td>
              <td className="p-3 border text-center space-x-2">
                <button
                  onClick={() => {
                    setEditing(cat);
                    setFormData({
                      nombre: cat.nombre,
                      descripcion: cat.descripcion,
                    });
                    setModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(cat.idCategory)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Editar Categoría" : "Agregar Categoría"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="border w-full p-2 mb-3 rounded-md"
                required
              />
              <textarea
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="border w-full p-2 mb-3 rounded-md"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditing(null);
                  }}
                  className="bg-gray-400 px-3 py-1 rounded-md text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 px-3 py-1 rounded-md text-white"
                >
                  {editing ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
