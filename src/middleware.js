import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {

  console.log("Middleware se está ejecutando para la ruta:", req.nextUrl.pathname);
  const token = req.cookies.get("session_token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { pathname } = req.nextUrl;

  //redirige al login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/user", req.url));
    }
    return NextResponse.next();
  } catch (err) {
    console.error("Error de credenciales:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};

