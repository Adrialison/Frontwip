"use client";
import React from 'react';
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const WipStoreSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Logos de marcas - Carrusel */}
      <div className="mb-12">
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2000}
          centerMode={true}
          className="flex items-center"
        >
          <div className="flex justify-center">
            <img src="/images/logos/Ugreen-logo.webp" alt="UGREEN Logo" className="h-10 mx-auto" />
          </div>
          <div className="flex justify-center">
            <img src="/images/logos/2023_LOGO-Baseus2_1200x1200.webp" alt="Baseus Logo" className="h-8 mx-auto" />
          </div>
          <div className="flex justify-center">
            <img src="/images/logos/Intel_logo_(2006-2020).svg.png" alt="Intel Logo" className="h-12 mx-auto" />
          </div>
          <div className="flex justify-center">
            <img src="/images/logos/Honor_(brand)-Logo.wine.png" alt="HONOR Logo" className="h-10 mx-auto" />
          </div>
          <div className="flex justify-center">
            <img src="/images/logos/Ryzen_Logo.png" alt="Ryzen Logo" className="h-10 mx-auto" />
          </div>
        </Slider>
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
              <img src="/images/celulares/cel1.webp" alt="Celular" className="h-32 w-32 object-cover rounded-xl mx-auto" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Celulares</h3>
        </div>

        {/* Computadoras */}
        <div className="text-center">
          <div className="bg-white rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="relative">
              <img src="/images/laptops/lap1.png" alt="laptop" className="h-35 w-35 object-cover rounded-xl mx-auto" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Computadoras</h3>
        </div>

        {/* Accesorios */}
        <div className="text-center">
          <div className="bg-white rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="relative">
              <img src="/images/accesorios/auri1.png" alt="accesorio" className="h-35 w-35 object-cover rounded-xl mx-auto" />

            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Accesorios</h3>
        </div>
      </div>
    </div>
  );
};

export default WipStoreSection;