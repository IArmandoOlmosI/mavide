"use server";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "../../../lib/MailVerif";
import crypto from "crypto"; // Para generar token único

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const captchaToken = req.headers.get("captcha-token");

    // Validar CAPTCHA
    const verify = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: "POST" }
    );
    const captchaResult = await verify.json();

    if (!captchaResult.success) {
      return NextResponse.json({ error: "CAPTCHA inválido" }, { status: 400 });
    }

    // Conectar a base de datos
    const client = await clientPromise;
    const db = client.db("mavide");

    // Verificar si el correo ya existe
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar token de verificación
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Guardar usuario en MongoDB con campo isVerified y verificationToken
    await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      verificationToken,
      createdAt: new Date(),
    });

    // Enviar correo de verificación
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "Usuario registrado. Revisa tu correo para verificar la cuenta." },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
