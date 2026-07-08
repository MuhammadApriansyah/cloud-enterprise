// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token');
  const { pathname } = request.nextUrl;

  // Izinkan akses publik ke Homepage (/) dan Login (/auth/login)
  if (pathname === '/' || pathname === '/auth/login') {
    return NextResponse.next();
  }

  // Proteksi dashboard
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

