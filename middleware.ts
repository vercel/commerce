import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Lista delle pagine protette
const protectedRoutes = ['/profile'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('token', token);
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (req.nextUrl.pathname.startsWith('/login') && token) {
    const profileUrl = new URL('/profile', req.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/profile', '/profile/:path*']
};
