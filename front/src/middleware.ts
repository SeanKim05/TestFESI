import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 *  계정 리다이렉트 미들웨어
 *
 * @description
 * - 보호된 라우트에 대한 인증 검사
 * - 인증된 사용자의 인증 페이지 접근 제한
 *
 */

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/mypage"];
  const authRoutes = ["/signin", "/signup"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
