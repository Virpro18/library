import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get("admin");

  // If the user has a token and tries to access /verify, redirect to dashboard
  if (userToken && request.nextUrl.pathname === "/verify") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user has a token and is not trying to access /verify, allow the request
  if (userToken) {
    return NextResponse.next();
  }

  // If the user doesn't have a token and is not trying to access /verify, redirect to /verify
  if (!userToken && request.nextUrl.pathname !== "/verify") {
    return NextResponse.redirect(new URL("/verify", request.url));
  }

  // For all other cases, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/verify"]
}
