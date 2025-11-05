"use client";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Modelo</th>
            <th className="py-2 px-4 border-b">Categoría</th>
            <th className="py-2 px-4 border-b">Marca</th>
            <th className="py-2 px-4 border-b">Imágenes</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.idProduct} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{prod.idProduct}</td>
              <td className="py-2 px-4 border-b">{prod.nombre}</td>
              <td className="py-2 px-4 border-b">{prod.precio}</td>
              <td className="py-2 px-4 border-b">{prod.modelo}</td>
              <td className="py-2 px-4 border-b">
                {prod.category?.nombre || "-"}
              </td>
              <td className="py-2 px-4 border-b">
                {prod.brand?.nombre || "-"}
              </td>

              <td className="py-2 px-4 border-b">
                <div className="flex gap-2 flex-wrap">
                  {(prod.images || []).map((img, i) => {
                    if (!img.imagen) return null;

                    const src = img.imagen.startsWith("http")
                      ? img.imagen
                      : `http://localhost:8000/${img.imagen.replace(
                          /^\/+/,
                          ""
                        )}`;

                    return (
                      <img
                        key={i}
                        src={src}
                        alt={`Producto ${prod.nombre} ${i}`}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    );
                  })}
                </div>
              </td>

              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(prod)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(prod.idProduct)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan="8"
                className="text-center py-4 text-gray-500 border-b"
              >
                No hay productos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
