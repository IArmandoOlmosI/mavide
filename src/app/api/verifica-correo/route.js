"use server";
import clientPromise from "@/lib/mongodb"; // revisa que esta ruta sea correcta
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token no proporcionado" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("mavide");

    const user = await db.collection("users").findOne({ verificationToken: token });
    if (!user) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 404 });
    }

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { isVerified: true }, $unset: { verificationToken: "" } }
    );

    return NextResponse.json({ message: "Correo verificado correctamente" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
