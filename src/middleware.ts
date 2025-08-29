import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_ROUTES = ["/admin"];
const USER_ROUTES = ["/user"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "development"
        ? "authjs.session-token"
        : "__Secure-authjs.session-token",
  });

  // get user role
  const userRole = token?.role;

  //   check if user logged in
  if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");

    return NextResponse.redirect(
      new URL(callbackUrl ? callbackUrl : "/", request.url)
    );
  }

  //   check if user is not admin
  if (
    ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  //   check if user is not user
  if (
    USER_ROUTES.some((route) => pathname.startsWith(route)) &&
    userRole !== "USER"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|auth).*)"],
};
