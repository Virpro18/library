import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Mengambil cookie menggunakan request.cookies
  const userToken = request.cookies.get("admin");

  // Jika cookie tidak ditemukan, redirect ke halaman login
  if (!userToken) {
    return NextResponse.redirect(new URL("/verify", request.url));
  }

  // Jika cookie ditemukan, lanjutkan request
  return NextResponse.next();
}

export const config = {
  matcher : "/dashboard/:path*"
}