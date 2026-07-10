// src/middleware/auth.ts
import { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function verifySession(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  const session = await decrypt(token || "");

  // 1. Definisikan Rute Tamu Khusus (Halaman publik yang hanya bisa diakses tamu)
  const isGuestOnlyRoute = pathname === '/auth/login' || pathname === '/auth/register';

  // 2. Jika sudah login, halangi akses ke form Login maupun Register
  if (isGuestOnlyRoute && session) {
    return { 
      isValid: false, 
      redirectTo: session.role === "ADMIN" ? '/admin' : '/dashboard' 
    };
  }

  // 3. Proteksi ketat untuk Area Dasbor & Admin
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    
    // Jika tidak ada token (atau cacat), tendang ke Login
    if (!session) {
      return { isValid: false, redirectTo: '/auth/login' };
    }

    // Role-Based Access Control (RBAC)
    if (pathname.startsWith('/admin') && session.role !== "ADMIN") {
      return { isValid: false, redirectTo: '/dashboard' };
    }
  }

  // 4. Sinkronisasi: Izinkan rute lainnya (termasuk /auth/register untuk tamu)
  return { isValid: true, redirectTo: null, session };
}
