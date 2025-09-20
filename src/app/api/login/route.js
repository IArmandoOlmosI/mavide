"use server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Almacenar intentos por IP (temporal, en memoria)
const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const BAN_TIME = 15 * 60 * 1000; // 15 minutos en ms

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const clientIp = req.headers.get("x-forwarded-for") || req.ip || "unknown";

    // Inicializar registro de IP si no existe
    if (!loginAttempts[clientIp]) {
      loginAttempts[clientIp] = { count: 0, lastAttempt: Date.now(), blockedUntil: null };
    }

    const attempt = loginAttempts[clientIp];

    // Verificar si está bloqueado
    if (attempt.blockedUntil && Date.now() < attempt.blockedUntil) {
      return NextResponse.json(
        { error: `Demasiados intentos. Intenta de nuevo en ${Math.ceil((attempt.blockedUntil - Date.now()) / 60000)} min.` },
        { status: 429 }
      );
    } else if (attempt.blockedUntil && Date.now() >= attempt.blockedUntil) {
      attempt.blockedUntil = null;
      attempt.count = 0;
    }

    const client = await clientPromise;
    const db = client.db("mavide");
    const user = await db.collection("users").findOne({ email });

    // Validación de usuario y contraseña
    const validPassword = user && (await bcrypt.compare(password, user.password));

    if (!user || !validPassword) {
      attempt.count++;
      attempt.lastAttempt = Date.now();

      if (attempt.count > MAX_ATTEMPTS) {
        attempt.blockedUntil = Date.now() + BAN_TIME;
        return NextResponse.json(
          { error: `Demasiados intentos. Intenta de nuevo en 15 min.` },
          { status: 429 }
        );
      }

      const remaining = MAX_ATTEMPTS - attempt.count;
      return NextResponse.json(
        { error: `Credenciales inválidas. Te quedan ${remaining > 0 ? remaining : 0} intentos antes de ser bloqueado.` },
        { status: 401 }
      );
    }

    // Verificar si el correo está confirmado
    if (!user.isVerified) {
      return NextResponse.json({ error: "Debes verificar tu correo antes de iniciar sesión" }, { status: 403 });
    }

    // Login exitoso: resetear contador
    attempt.count = 0;
    attempt.blockedUntil = null;

    // Devuelve rol para redirección
    return NextResponse.json({ role: user.role }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
