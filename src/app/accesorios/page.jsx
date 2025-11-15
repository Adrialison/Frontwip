'use client';
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, ChevronDown, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

export default function EcommerceStore() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  const brands = [
    { name: 'Argom', count: 3 },
    { name: 'CoolerMaster', count: 1 },
    { name: 'Gear Gamer', count: 2 },
    { name: 'HyperX', count: 3 },
    { name: 'Klip', count: 4 },
    { name: 'Kuzler', count: 3 },
    { name: 'Logitech', count: 26 },
    { name: 'Primus Gaming', count: 6 },
    { name: 'Redragon', count: 19 },
    { name: 'Spedra', count: 6 },
    { name: 'TFROG', count: 6 },
    { name: 'Targus', count: 2 },
    { name: 'Vivitar', count: 1 },
    { name: 'Xtecit', count: 7 }
  ];

  const products = [
    {
      id: 1,
      name: 'Combo Teclado + Mouse Slim MK470 Wireless Rosado',
      price: 250,
      originalPrice: 237.50,
      discount: 5,
      image: 'pink'
    },
    {
      id: 2,
      name: 'Teclado Gamer Español Kumara Blanco - Red Switch (K552W-RGB)',
      price: 250,
      originalPrice: 237.50,
      discount: 5,
      image: 'white'
    },
    {
      id: 3,
      name: 'Combo Teclado + Mouse Slim MK470 Wireless Rosado',
      price: 250,
      originalPrice: 237.50,
      discount: 5,
      image: 'pink'
    },
    {
      id: 4,
      name: 'Combo Teclado + Mouse Slim MK470 Wireless Rosado',
      price: 250,
      originalPrice: 237.50,
      discount: 5,
      image: 'pink'
    },
    {
      id: 5,
      name: 'Combo Teclado + Mouse Slim MK470 Wireless Rosado',
      price: 250,
      originalPrice: 237.50,
      discount: 5,
      image: 'pink'
    },
    {
      id: 6,
      name: 'Combo Teclado + Mouse Slim MK470 Wireless Rosado',
      price: 250,
      originalPrice: 237.50,
      discount: 5,
      image: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-pink-400 text-white text-center py-2 text-sm">
        Conexión WIP | Cuotas desde 0% de interés con todas las tarjetas de crédito.
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-pink-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Filtros</h2>
              
              <div className="bg-pink-200 rounded-lg p-3">
                <button className="w-full flex items-center justify-between text-left font-semibold mb-3">
                  <span>Marca</span>
                  <ChevronDown size={16} />
                </button>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand.name} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand.name]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand.name));
                          }
                        }}
                      />
                      <span>{brand.name}({brand.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-3">Logitech</h3>
                    <p className="text-sm text-gray-700 mb-4 min-h-[40px]">{product.name}</p>
                    
                    {/* Product Image */}
                    <div className="relative mb-4 bg-gray-50 rounded-lg p-6 flex items-center justify-center min-h-[180px]">
                      <div className="text-center">
                        {product.image === 'white' ? (
                          <div className="space-y-2">
                            <div className="w-48 h-16 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 rounded-lg mx-auto"></div>
                            <div className="flex gap-2 justify-center">
                              <div className="w-12 h-12 bg-pink-300 rounded-full"></div>
                              <div className="w-12 h-12 bg-pink-300 rounded-full"></div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-48 h-16 bg-pink-300 rounded-lg mx-auto"></div>
                            <div className="flex gap-2 justify-center">
                              <div className="w-12 h-12 bg-pink-300 rounded-full"></div>
                              <div className="w-12 h-12 bg-pink-300 rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded">-{product.discount}%</span>
                          <span className="text-xl font-bold">S/{product.price}</span>
                        </div>
                        <div className="text-sm text-gray-400 line-through">S/ {product.originalPrice.toFixed(2)}</div>
                        <div className="text-xs text-gray-600 mt-1">Precio con descuento</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="p-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50">
                          <Heart size={20} />
                        </button>
                        <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                          <ShoppingCart size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="p-2 text-gray-400 hover:text-pink-500">
                <ChevronLeft size={24} />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded ${
                    page === 1 ? 'bg-pink-300 text-white' : 'bg-pink-100 text-gray-700 hover:bg-pink-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 text-gray-400 hover:text-pink-500">
                <ChevronRight size={24} />
              </button>
            </div>
          </main>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
        <MessageCircle size={28} className="text-white" />
      </button>
    </div>
  );
}