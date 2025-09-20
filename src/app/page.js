"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [lightboxImg, setLightboxImg] = useState(null);

  const productos = [
    { nombre: "Calendarios", src: "/productos/calendarios.jpg" },
    { nombre: "Corte Láser", src: "/productos/corte.jpg" },
    { nombre: "Llaveros", src: "/productos/llaveros_2.jpg" },
    { nombre: "Sublimación", src: "/productos/sublimacion.jpg" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-200"> {/* Fondo gris claro */}
      <Header />

      <main className="flex-grow p-8 flex flex-col items-center">
        <div className="grid grid-cols-2 gap-8">
          {productos.map((p) => (
            <button
              key={p.nombre}
              onClick={() => setLightboxImg(p.src)}
              className="relative w-[500px] h-[300px] bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center
                         transform transition-transform duration-300 hover:scale-105"
            >
              <Image 
                src={p.src} 
                alt={p.nombre} 
                fill 
                className="object-cover"
              />
              <div className="absolute text-center text-white text-6xl font-bold drop-shadow-xl px-2">
                {p.nombre}
              </div>
            </button>
          ))}
        </div>

        {lightboxImg && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setLightboxImg(null)}
          >
            <div className="relative">
              <Image 
                src={lightboxImg} 
                alt="Producto" 
                width={800} 
                height={600} 
                className="rounded-lg shadow-2xl"
              />
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }}
                className="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
