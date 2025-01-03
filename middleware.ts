import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/profile'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (req.nextUrl.pathname.startsWith('/login') && token) {
    const profileUrl = new URL('/profile', req.url);
    return NextResponse.redirect(profileUrl);
  }

  if (req.nextUrl.pathname.endsWith('/product')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/profile', '/profile/:path*', '/product']
};
