"use client";
import { useState, useEffect } from "react";
import { getProducts, getBrands } from "../services/productService";
import { getVariants } from "../services/variantService";
import Link from "next/link";

// CONFIGURACIÓN: Cambia solo esta línea para cada categoría
const CATEGORY_NAME = "celulares"; // Puede ser: "celulares", "computadoras", "accesorios", etc.

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const productsPerPage = 6; // 3x2 grid

  // Colores típicos de celulares - TODOS VISIBLES
  const defaultColors = [
    "Negro",
    "Blanco", 
    "Azul",
    "Rojo",
    "Rosa",
    "Morado",
    "Verde",
    "Plateado",
    "Dorado"
  ];

  // Efecto para prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, brandsData, variantsData] = await Promise.all([
        getProducts(),
        getBrands(),
        getVariants(),
      ]);

      // Filtrar productos por categoría
      const categoryProducts = productsData.filter(
        (product) =>
          product.category?.nombre?.toLowerCase() === CATEGORY_NAME.toLowerCase()
      );

      setProducts(categoryProducts);
      setBrands(brandsData);
      setVariants(variantsData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasStock = (productId) => {
    const productVariants = variants.filter(
      (v) => Number(v.idProduct) === Number(productId)
    );
    return productVariants.some((v) => Number(v.stock) > 0);
  };

  const getTotalStock = (productId) => {
    return variants
      .filter((v) => Number(v.idProduct) === Number(productId))
      .reduce((sum, v) => sum + Number(v.stock || 0), 0);
  };

  const handleBrandToggle = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
    setCurrentPage(1);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // NUEVA FUNCIÓN: Abrir modal
  const openCartModal = (product) => {
    setSelectedProduct(product);
    setSelectedColor("");
    setModalOpen(true);
  };

  // NUEVA FUNCIÓN: Cerrar modal
  const closeCartModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setSelectedColor("");
  };

  // NUEVA FUNCIÓN: Agregar al carrito desde el modal
  const addToCartFromModal = () => {
    if (!selectedProduct) return;
    
    console.log("Agregado al carrito:", selectedProduct);
    console.log("Color seleccionado:", selectedColor);
    alert(`${selectedProduct.nombre} agregado al carrito${selectedColor ? ` - Color: ${selectedColor}` : ''}`);
    
    // Aquí puedes agregar la lógica real para agregar al carrito
    closeCartModal();
  };

  // Filtrar productos por marca
  const filteredProducts =
    selectedBrands.length > 0
      ? products.filter((product) => selectedBrands.includes(product.idBrand))
      : products;

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getBrandName = (idBrand) => {
    const brand = brands.find((b) => b.idBrand === idBrand);
    return brand ? brand.nombre : "Sin marca";
  };

  const getBrandProductCount = (brandId) => {
    return products.filter((p) => p.idBrand === brandId).length;
  };

  const getCategoryTitle = () => {
    return CATEGORY_NAME.charAt(0).toUpperCase() + CATEGORY_NAME.slice(1);
  };

  // Función para obtener el color CSS según el nombre del color
  const getColorStyle = (colorName) => {
    const colorMap = {
      'Negro': 'bg-gray-900',
      'Blanco': 'bg-white border border-gray-300',
      'Azul': 'bg-blue-500',
      'Rojo': 'bg-red-500',
      'Rosa': 'bg-pink-400',
      'Morado': 'bg-purple-500',
      'Verde': 'bg-green-500',
      'Plateado': 'bg-gray-300',
      'Dorado': 'bg-yellow-400'
    };
    return colorMap[colorName] || 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-2xl text-pink-600 font-semibold">Cargando {CATEGORY_NAME}...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {/* MODAL DEL CARRITO - MÁS GRANDE CON TODOS LOS COLORES VISIBLES */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-white/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full mx-auto border-2 border-pink-100 shadow-2xl">
            <div className="p-8">
              {/* Encabezado del modal con botón cerrar */}
              <div className="flex justify-end items-center mb-6">
                <button 
                  onClick={closeCartModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-light bg-pink-50 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              {/* Contenido principal del modal */}
              <div className="flex gap-8">
                {/* Imagen del producto - Lado izquierdo - MÁS GRANDE */}
                <div className="flex-1">
                  <div className="w-full h-80 bg-gradient-to-br from-pink-50 to-white rounded-xl flex items-center justify-center p-8">
                    {selectedProduct.images?.[0]?.imagen ? (
                      <img
                        src={`http://localhost:8000${selectedProduct.images?.[0]?.imagen}`}
                        alt={selectedProduct.nombre}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-pink-200">
                        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Información del producto - Lado derecho */}
                <div className="flex-1">
                  <div className="space-y-4">
                    {/* Nombre del producto */}
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                      {selectedProduct.nombre}
                    </h2>

                    {/* SKU */}
                    <p className="text-gray-500 text-base">
                      SKU: {selectedProduct.idProduct}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400 text-lg">
                        ★★★★☆
                      </div>
                      <span className="text-gray-600 text-base">
                        (100+ Comentarios)
                      </span>
                    </div>

                    {/* Precio */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-pink-600">
                          S/. {parseFloat(selectedProduct.precio).toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          S/. {(parseFloat(selectedProduct.precio) * 1.08).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-pink-600 font-medium text-sm">
                        Precio con descuento
                      </p>
                    </div>

                    {/* Selector de color - TODOS LOS COLORES VISIBLES */}
                    <div className="space-y-3">
                      <label className="block text-lg font-semibold text-gray-800">
                        Color: <span className="text-gray-600 font-normal">{selectedColor || "Seleccionar"}</span>
                      </label>
                      <div className="grid grid-cols-5 gap-3">
                        {defaultColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                              selectedColor === color 
                                ? 'border-pink-500 ring-2 ring-pink-200' 
                                : 'border-gray-300 hover:border-pink-300'
                            }`}
                            title={color}
                          >
                            <div className={`w-6 h-6 rounded-full ${getColorStyle(color)}`}></div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Botones de acción - CON CORAZÓN */}
                    <div className="flex gap-4 mt-6">
                      {/* Botón de favorito */}
                      <button
                        onClick={() => toggleFavorite(selectedProduct.idProduct)}
                        className={`flex-shrink-0 w-9 h-9 rounded-xl border-2 flex items-center justify-center transition ${
                          favorites.includes(selectedProduct.idProduct)
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-200 hover:border-pink-400 hover:bg-pink-50"
                        }`}
                      >
                        <svg
                          className={`w-7 h-7 ${
                            favorites.includes(selectedProduct.idProduct)
                              ? "fill-pink-500 text-pink-500"
                              : "fill-none text-gray-400"
                          }`}
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>

                      {/* Botón de agregar */}
                      <button
                        onClick={addToCartFromModal}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-bold text-base hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        AÑADIR A LA BOLSA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* El resto de tu código permanece igual */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar de Filtros */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-5 sticky top-4">
              <h2 className="text-lg font-bold text-pink-600 mb-4 pb-3 border-b border-pink-100">
                Filtros
              </h2>

              {/* Filtro por Marca */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between text-sm">
                  Marca
                  <svg
                    className="w-4 h-4 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </h3>

                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {brands.map((brand) => {
                    const count = getBrandProductCount(brand.idBrand);
                    if (count === 0) return null;

                    return (
                      <label
                        key={brand.idBrand}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.idBrand)}
                          onChange={() => handleBrandToggle(brand.idBrand)}
                          className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700 flex-1">
                          {brand.nombre}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Botón para limpiar filtros */}
              {selectedBrands.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setCurrentPage(1);
                  }}
                  className="w-full mt-4 px-4 py-2.5 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition text-sm font-medium"
                >
                  Limpiar Filtros
                </button>
              )}
            </div>
          </aside>

          {/* Grid de Productos */}
          <main className="flex-1">
            {currentProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-pink-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-xl text-gray-500">
                  No se encontraron productos con los filtros seleccionados
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentProducts.map((product) => (
                    <div
                      key={product.idProduct}
                      className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-lg hover:border-pink-200 transition-all duration-300"
                    >
                      {/* Imagen del producto */}
                      <div className="relative h-56 bg-gradient-to-br from-pink-50 to-white overflow-hidden group">
                        <Link href={`/productos/${product.idProduct}`}>
                          {product.images?.[0]?.imagen ? (
                            <img
                              src={`http://localhost:8000${product.images?.[0]?.imagen}`}
                              alt={product.nombre}
                              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-pink-200">
                              <svg
                                className="w-20 h-20"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </Link>

                        {/* Badge de marca */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-white text-gray-700 text-xs px-3 py-1.5 rounded-full font-semibold shadow-md border border-pink-100">
                            {getBrandName(product.idBrand)}
                          </span>
                        </div>

                        {/* Badge de stock */}
                        {hasStock(product.idProduct) && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                              Stock: {getTotalStock(product.idProduct)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Información del producto */}
                      <div className="p-4">
                        <Link href={`/products/${product.idProduct}`}>
                          <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[40px] hover:text-pink-600 transition">
                            {product.nombre}
                          </h3>
                        </Link>

                        <div className="mb-4">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-md font-bold">
                              -8%
                            </span>
                            <span className="text-2xl font-bold text-pink-600">
                              S/. {parseFloat(product.precio).toFixed(2)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400 line-through">
                            S/. {(parseFloat(product.precio) * 1.08).toFixed(2)}
                          </span>
                          <p className="text-xs text-pink-600 font-medium mt-1">
                            Precio con descuento
                          </p>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(product.idProduct)}
                            className={`flex-shrink-0 w-11 h-11 rounded-lg border-2 flex items-center justify-center transition ${
                              favorites.includes(product.idProduct)
                                ? "border-pink-500 bg-pink-50"
                                : "border-gray-200 hover:border-pink-400 hover:bg-pink-50"
                            }`}
                          >
                            <svg
                              className={`w-5 h-5 ${
                                favorites.includes(product.idProduct)
                                  ? "fill-pink-500 text-pink-500"
                                  : "fill-none text-gray-400"
                              }`}
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>

                          {/* BOTÓN MODIFICADO: Ahora abre el modal */}
                          <button
                            onClick={() => openCartModal(product)}
                            disabled={!hasStock(product.idProduct)}
                            className={`flex-1 h-11 rounded-lg flex items-center justify-center gap-2 font-semibold transition text-sm ${
                              hasStock(product.idProduct)
                                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-md hover:shadow-lg"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {hasStock(product.idProduct)
                              ? "Agregar"
                              : "Agotado"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-pink-100"
                      }`}
                    >
                      ‹
                    </button>

                    <div className="flex gap-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`w-10 h-10 rounded-lg font-semibold transition ${
                            currentPage === index + 1
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md"
                              : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-pink-100"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-pink-100"
                      }`}
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}