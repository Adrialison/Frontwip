"use client";

export default function ProductModal({
  show,
  onClose,
  onSave,
  product,
  setProduct,
  categories,
  brands,
  imagePreviews,
  setImagePreviews,
}) {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Agregar nuevas imágenes al producto
    setProduct((prev) => ({
      ...prev,
      imagenes: [...(prev.imagenes || []), ...files],
    }));

    // Previews acumulativos
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    // Eliminar de nuevas imágenes
    setProduct((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
      existingImages: prev.existingImages?.filter((_, i) => i !== index),
    }));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {product.nombre ? "Editar Producto" : "Agregar Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="nombre"
            value={product.nombre || ""}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border p-2 rounded"
          />
          <textarea
            name="descripcion"
            value={product.descripcion || ""}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="precio"
            value={product.precio || ""}
            onChange={handleChange}
            placeholder="Precio"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="modelo"
            value={product.modelo || ""}
            onChange={handleChange}
            placeholder="Modelo"
            className="w-full border p-2 rounded"
          />

          <select
            name="idCategory"
            value={product.idCategory || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecciona Categoría</option>
            {categories.map((cat) => (
              <option key={cat.idCategory} value={cat.idCategory}>
                {cat.nombre}
              </option>
            ))}
          </select>

          <select
            name="idBrand"
            value={product.idBrand || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecciona Marca</option>
            {brands.map((brand) => (
              <option key={brand.idBrand} value={brand.idBrand}>
                {brand.nombre}
              </option>
            ))}
          </select>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium mb-1">Imágenes</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />

            {imagePreviews && imagePreviews.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
