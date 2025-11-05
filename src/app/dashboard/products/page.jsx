"use client";
import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";
import ProductTable from "./ProductTable";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { getBrands } from "../../services/brandService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Cargar productos, categorías y marcas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prods = await getProducts();
        setProducts(prods);

        const cats = await getCategories();
        setCategories(cats);

        const brs = await getBrands();
        setBrands(brs);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  // Agregar producto
  const handleAddProduct = () => {
    setProduct({
      nombre: "",
      descripcion: "",
      precio: "",
      modelo: "",
      idCategory: "",
      idBrand: "",
      imagenes: [],
      existingImages: [],
    });
    setImagePreviews([]);
    setShowModal(true);
  };

  // Editar producto
  const handleEditProduct = (prod) => {
    setProduct({
      ...prod,
      imagenes: [], // solo nuevas imágenes
      existingImages: prod.images || [], // imágenes de la BD
    });

    // Previews combinadas
    const previews = (prod.images || []).map((img) =>
      img.imagen.startsWith("http")
        ? img.imagen
        : `http://localhost:8000/storage/${img.imagen}`
    );

    setImagePreviews(previews);
    setShowModal(true);
  };

  // Guardar producto (nuevo o actualizado)
  const handleSaveProduct = async () => {
    const formData = new FormData();
    formData.append("nombre", product.nombre);
    formData.append("descripcion", product.descripcion);
    formData.append("precio", product.precio);
    formData.append("modelo", product.modelo);
    formData.append("idCategory", product.idCategory);
    formData.append("idBrand", product.idBrand);

    // Agregar nuevas imágenes
    (product.imagenes || []).forEach((file) =>
      formData.append("imagenes[]", file)
    );

    // Mantener imágenes existentes
    formData.append(
      "existingImages",
      JSON.stringify(product.existingImages || [])
    );

    try {
      if (product.idProduct) {
        await updateProduct(product.idProduct, formData);
      } else {
        await createProduct(formData);
      }

      setShowModal(false);
      const prods = await getProducts();
      setProducts(prods);
    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.idProduct !== id));
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAddProduct}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Agregar Producto
      </button>

      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
        product={product}
        setProduct={setProduct}
        imagePreviews={imagePreviews}
        setImagePreviews={setImagePreviews}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}
