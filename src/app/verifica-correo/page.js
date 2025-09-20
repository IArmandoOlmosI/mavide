"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Verificando tu correo...");
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setMessage("Token no proporcionado");
        setError(true);
        return;
      }

      try {
        const res = await fetch(`/api/verifica-correo?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setMessage("¡Correo verificado correctamente! Serás redirigido al login...");
          setTimeout(() => router.push("/login"), 4000);
        } else {
          setMessage(data.error || "Error al verificar el correo");
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setMessage("Error de conexión al servidor");
        setError(true);
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className={`p-8 rounded-lg shadow-md text-center ${error ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
        <h1 className="text-2xl font-bold mb-4">{message}</h1>
        { !error && <p>Espere un momento mientras te redirigimos...</p> }
      </div>
    </div>
  );
}
