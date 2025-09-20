"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const adminName = "Administrador"; // puede venir del login
  const role = "admin";

  const handleLogout = () => {
    // Limpiar sesión o tokens aquí si es necesario
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />

      <main className="flex flex-col items-center p-8">
        {/* Cuadro grande arriba */}
        <div className="relative w-full max-w-5xl h-80 bg-white rounded-lg shadow-lg mb-4 overflow-hidden">
          <Image
            src="/images/admin.jpeg"
            alt="Imagen principal admin"
            fill
            className="object-cover"
          />
        </div>

        {/* Mensaje de bienvenida */}
        <div className="w-full max-w-5xl text-center mb-8">
          <p className="text-2xl md:text-3xl font-bold text-gray-900 bg-white bg-opacity-80 p-4 rounded-lg shadow-md">
            ¡Bienvenido, {adminName}! 
          </p>
        </div>

        {/* Dos cuadros abajo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-8">
          <div className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/productos/llaveros.jpg"
              alt="Box 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/productos/corte.jpg"
              alt="Box 2"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
        >
          Cerrar Sesión
        </button>
      </main>

      <Footer />
    </div>
  );
}
