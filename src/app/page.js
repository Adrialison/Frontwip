import React from 'react';

const WipStoreSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Logos de marcas */}
        <div className="flex justify-center items-center space-x-12 mb-12">
          <img src="/images/logos/Ugreen-logo.webp" alt="UGREEN Logo" className="h-10" />
          <img src="/images/logos/2023_LOGO-Baseus2_1200x1200.webp" alt="Baseus Logo" className="h-8" />
          <img src="/images/logos/Intel_logo_(2006-2020).svg.png" alt="Intel Logo" className="h-12" />
          <img src="/images/logos/Honor_(brand)-Logo.wine.png" alt="HONOR Logo" className="h-10" />
          <img src="/images/logos/Ryzen_Logo.png" alt="Ryzen Logo" className="h-10" />
        </div>

      {/* Banner WIP Store */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 rounded-2xl mb-12 py-6">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            WIP Store 🚀

          </h2>
        </div>
      </div>

      {/* Categorías de productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Celulares */}
        <div className="text-center">
          <div className="bg-white rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="relative">
              <div className="w-24 h-32 bg-gradient-to-br from-purple-200 to-green-200 rounded-2xl border-2 border-gray-300 relative">
                <div className="absolute top-2 left-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-black rounded-lg"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-purple-400 to-green-400 rounded-lg"></div>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Celulares</h3>
        </div>

        {/* Computadoras */}
        <div className="text-center">
          <div className="bg-white rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="relative">
              <div className="w-32 h-20 bg-gradient-to-br from-green-300 to-purple-400 rounded-lg border-2 border-gray-300">
                <div className="w-full h-2 bg-gray-400 rounded-t-lg"></div>
                <div className="mt-1 px-2">
                  <div className="w-full h-2 bg-gradient-to-r from-green-400 to-purple-500 rounded"></div>
                </div>
              </div>
              <div className="w-36 h-2 bg-gray-400 mx-auto mt-1 rounded-full"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Computadoras</h3>
        </div>

        {/* Accesorios */}
        <div className="text-center">
          <div className="bg-white rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="relative">
              {/* Audífonos */}
              <div className="w-20 h-20 relative">
                <div className="absolute inset-0 bg-black rounded-full"></div>
                <div className="absolute inset-2 bg-gray-800 rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 w-3 h-8 bg-pink-500 rounded-full"></div>
              </div>
              {/* Base/soporte */}
              <div className="w-16 h-3 bg-black mx-auto mt-2 rounded-full"></div>
              <div className="w-12 h-6 bg-black mx-auto rounded-b-lg"></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Accesorios</h3>
        </div>
      </div>
    </div>
  );
};

export default WipStoreSection;