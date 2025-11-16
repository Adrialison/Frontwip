"use client";
import { useState, useEffect } from "react";
import { getProducts, getBrands } from "../services/productService";
import { getVariants } from "../services/variantService";
import Link from "next/link";

export default function computadorasPage() {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const productsPerPage = 12;

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

      // Filtrar solo productos de categoría "Computadoras"
      const computadoras = productsData.filter(
        (product) =>
          product.category?.nombre?.toLowerCase() === "computadoras" ||
          product.category?.nombre?.toLowerCase() === "computadoras"
      );

      setProducts(computadoras);
      setBrands(brandsData);
      setVariants(variantsData);
      console.log("📦 Variants:", variantsData);
      console.log("🛒 Products:", computadoras);
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

  const addToCart = (product) => {
    console.log("Agregado al carrito:", product);
    alert(`${product.nombre} agregado al carrito`);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Cargando computadoras...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Computadoras</h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} productos encontrados
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar de Filtros */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Filtros</h2>

              {/* Filtro por Marca */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center justify-between">
                  Marca
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </h3>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {brands.map((brand) => {
                    const count = getBrandProductCount(brand.idBrand);
                    if (count === 0) return null;

                    return (
                      <label
                        key={brand.idBrand}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.idBrand)}
                          onChange={() => handleBrandToggle(brand.idBrand)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 flex-1">
                          {brand.nombre}
                        </span>
                        <span className="text-xs text-gray-500">({count})</span>
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
                  className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                >
                  Limpiar Filtros
                </button>
              )}
            </div>
          </aside>

          {/* Grid de Productos */}
          <main className="flex-1">
            {currentProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
                  No se encontraron computadoras con los filtros seleccionados
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <div
                      key={product.idProduct}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Imagen del producto */}
                      <div className="relative h-64 bg-gray-100 overflow-hidden group">
                        <Link href={`/products/${product.idProduct}`}>
                          {product.images?.[0]?.imagen ? (
                            <img
                              src={`http://localhost:8000${product.images?.[0]?.imagen}`}
                              alt={product.nombre}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
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
                        <div className="absolute top-2 right-2">
                          <span className="bg-white text-gray-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                            {getBrandName(product.idBrand)}
                          </span>
                        </div>

                        {/* Badge de descuento */}
                        <div className="absolute top-2 left-2">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                            -8%
                          </span>
                        </div>

                        {/* Badge de stock */}
                        {hasStock(product.idProduct) && (
                          <div className="absolute bottom-2 left-2">
                            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                              En Stock ({getTotalStock(product.idProduct)})
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Información del producto */}
                      <div className="p-4">
                        <Link href={`/products/${product.idProduct}`}>
                          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px] hover:text-blue-600 transition">
                            {product.nombre}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">
                                -8%
                              </span>
                              <span className="text-2xl font-bold text-gray-900">
                                S/. {parseFloat(product.precio).toFixed(2)}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400 line-through">
                              S/.{" "}
                              {(parseFloat(product.precio) * 1.08).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(product.idProduct)}
                            className={`flex-shrink-0 w-12 h-12 rounded-lg border-2 flex items-center justify-center transition ${
                              favorites.includes(product.idProduct)
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300 hover:border-red-500 hover:bg-red-50"
                            }`}
                          >
                            <svg
                              className={`w-6 h-6 ${
                                favorites.includes(product.idProduct)
                                  ? "fill-red-500 text-red-500"
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

                          <button
                            onClick={() => addToCart(product)}
                            disabled={!hasStock(product.idProduct)}
                            className={`flex-1 h-12 rounded-lg flex items-center justify-center gap-2 font-medium transition ${
                              hasStock(product.idProduct)
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
                      className={`px-4 py-2 rounded-lg font-medium ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                      }`}
                    >
                      Anterior
                    </button>

                    <div className="flex gap-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            currentPage === index + 1
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
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
                      className={`px-4 py-2 rounded-lg font-medium ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                      }`}
                    >
                      Siguiente
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
