"use client";
import { useState, useEffect } from "react";
import { getProducts, getBrands } from "../../services/productService";
import { getVariants } from "../../services/variantService";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;
  
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Colores por defecto
  const defaultColors = [
    "Negro", "Blanco", "Azul", "Rojo", "Rosa", 
    "Morado", "Verde", "Plateado", "Dorado"
  ];

  useEffect(() => {
    loadProductData();
  }, [productId]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      const [productsData, brandsData, variantsData] = await Promise.all([
        getProducts(),
        getBrands(),
        getVariants(),
      ]);

      // Encontrar el producto por ID
      const foundProduct = productsData.find(
        (p) => Number(p.idProduct) === Number(productId)
      );

      setProduct(foundProduct);
      setBrands(brandsData);
      setVariants(variantsData);
    } catch (error) {
      console.error("Error al cargar datos del producto:", error);
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

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = () => {
    if (!product) return;
    
    console.log("Agregado al carrito:", product);
    console.log("Color seleccionado:", selectedColor);
    alert(`${product.nombre} agregado al carrito${selectedColor ? ` - Color: ${selectedColor}` : ''}`);
  };

  const getBrandName = (idBrand) => {
    const brand = brands.find((b) => b.idBrand === idBrand);
    return brand ? brand.nombre : "Sin marca";
  };

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
        <div className="text-2xl text-pink-600 font-semibold">Cargando producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-2xl text-pink-600 font-semibold">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-pink-600 hover:text-pink-700">
            Inicio
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Producto</span>
        </nav>

        {/* Contenido principal del producto */}
        <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Imagen del producto - Lado izquierdo */}
              <div className="lg:flex-1">
                <div className="w-full h-96 bg-gradient-to-br from-pink-50 to-white rounded-xl flex items-center justify-center p-8">
                  {product.images?.[0]?.imagen ? (
                    <img
                      src={`http://localhost:8000${product.images?.[0]?.imagen}`}
                      alt={product.nombre}
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
              <div className="lg:flex-1">
                <div className="space-y-6">
                  {/* Badge de marca */}
                  <div className="inline-block">
                    <span className="bg-white text-gray-700 text-sm px-4 py-2 rounded-full font-semibold shadow-md border border-pink-100">
                      {getBrandName(product.idBrand)}
                    </span>
                  </div>

                  {/* Nombre del producto */}
                  <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                    {product.nombre}
                  </h1>

                  {/* SKU */}
                  <p className="text-gray-500 text-lg">
                    SKU: {product.idProduct}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex text-yellow-400 text-xl">
                      ★★★★☆
                    </div>
                    <span className="text-gray-600 text-lg">
                      (100+ Comentarios)
                    </span>
                  </div>

                  {/* Precio */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <span className="text-4xl font-bold text-pink-600">
                        S/. {parseFloat(product.precio).toFixed(2)}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        S/. {(parseFloat(product.precio) * 1.08).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-pink-600 font-medium text-base">
                      Precio con descuento
                    </p>
                  </div>

                  {/* Stock */}
                  {hasStock(product.idProduct) && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-700 font-semibold">
                        ✅ En stock: {getTotalStock(product.idProduct)} unidades disponibles
                      </p>
                    </div>
                  )}

                  {/* Selector de color */}
                  <div className="space-y-4">
                    <label className="block text-xl font-semibold text-gray-800">
                      Color: <span className="text-gray-600 font-normal">{selectedColor || "Seleccionar"}</span>
                    </label>
                    <div className="grid grid-cols-5 gap-4">
                      {defaultColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColor === color 
                              ? 'border-pink-500 ring-2 ring-pink-200' 
                              : 'border-gray-300 hover:border-pink-300'
                          }`}
                          title={color}
                        >
                          <div className={`w-8 h-8 rounded-full ${getColorStyle(color)}`}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-4 mt-8">
                    {/* Botón de favorito */}
                    <button
                      onClick={() => toggleFavorite(product.idProduct)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 flex items-center justify-center transition ${
                        favorites.includes(product.idProduct)
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-pink-400 hover:bg-pink-50"
                      }`}
                    >
                      <svg
                        className={`w-8 h-8 ${
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

                    {/* Botón de agregar */}
                    <button
                      onClick={addToCart}
                      disabled={!hasStock(product.idProduct)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-5 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {hasStock(product.idProduct) ? "AÑADIR A LA BOLSA" : "AGOTADO"}
                    </button>
                  </div>

                  {/* Descripción adicional */}
                  <div className="bg-pink-50 rounded-xl p-6 mt-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Características principales:</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Envío gratis en compras mayores a S/50</li>
                      <li>• Garantía de 1 año incluida</li>
                      <li>• Soporte técnico especializado</li>
                      <li>• Devolución gratuita en 30 días</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}