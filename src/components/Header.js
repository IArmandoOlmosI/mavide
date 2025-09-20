"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 flex-wrap">

        {/* Logo y nombre como botón */}
        <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition">
          <Image
            src="/images/logobyn.png"
            alt="Logo Grupo MAVIDE"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-2xl font-bold tracking-wide cursor-pointer">
            Grupo MAVIDE
          </span>
        </Link>

        {/* Botones de Login y Registro */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/login">
            <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-900 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-white text-blue-900 px-4 py-2 rounded font-semibold hover:bg-gray-200 transition">
              Registro
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}
