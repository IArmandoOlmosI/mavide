"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Script from "next/script";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalMsg, setModalMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalMsg("");

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setModalMsg("Las contraseñas no coinciden");
      return;
    }

    try {
      // Generar token reCAPTCHA
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "register" }
      );

      const res = await fetch("/api/registerUser", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "captcha-token": token
        },
        body: JSON.stringify({ email, password, role: "user" }),
      });

      const data = await res.json();

      if (res.ok) {
        // Mostrar el mensaje que envía el backend (revisar correo)
        setModalMsg(data.message);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setModalMsg(data.error || "Error al registrar usuario");
      }
    } catch (err) {
      setModalMsg("Error de conexión al servidor");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      <Header />

      <main className="flex flex-grow">

        {/* Imagen a la izquierda */}
        <div className="hidden md:flex w-1/2 bg-gray-300 items-center justify-center">
          <img 
            src="/images/registro.jpeg" 
            alt="Registro Imagen" 
            className="object-cover w-3/4 h-3/4 rounded-lg shadow-lg"
          />
        </div>

        {/* Formulario a la derecha */}
        <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-12 bg-gray-100">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Registro de Usuario</h2>
          
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
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-5 py-3 border-2 border-gray-400 rounded-lg text-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              required
            />

            <button
              type="submit"
              className="bg-blue-900 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
            >
              Registrarse
            </button>
          </form>
        </div>

      </main>

      <Footer />

      {modalMsg && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 text-white p-8 md:p-10 rounded-lg shadow-xl w-80 md:w-96 text-center">
            <p className="text-lg md:text-xl font-semibold mb-6 break-words">
              {modalMsg}
            </p>
            <button
              onClick={() => {
                setModalMsg("");
                if (modalMsg.includes("Revisa tu correo")) {
                  router.push("/login");
                }
              }}
              className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
