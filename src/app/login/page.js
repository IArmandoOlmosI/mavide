"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirige según el rol del usuario
        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      } else {
        setError(data.error || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión al servidor");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />

      <main className="flex flex-grow">
        {/* Imagen izquierda */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src="/images/login.jpeg"
            alt="Login Imagen"
            className="object-cover w-3/4 h-3/4 rounded-lg shadow-lg"
          />
        </div>

        {/* Formulario derecha */}
        <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-12 bg-gray-100">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 border-2 border-gray-400 rounded-lg text-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-5 py-3 border-2 border-gray-400 rounded-lg text-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              required
            />

            {error && (
              <p className="text-red-600 px-4 py-2 rounded-lg text-center text-lg font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-900 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
