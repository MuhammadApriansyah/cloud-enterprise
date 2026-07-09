import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './middleware/auth';

// PERBAIKAN: Ubah nama ekspor dari 'middleware' menjadi 'proxy'
export async function proxy(request: NextRequest) {
  // Panggil mesin verifikasi tersinkronisasi
  const authResult = await verifySession(request);

  // Jika hasil verifikasi memutuskan user tidak valid untuk rute tersebut
  if (!authResult.isValid && authResult.redirectTo) {
    const response = NextResponse.redirect(new URL(authResult.redirectTo, request.url));
    
    // Auto-Purge: Hancurkan cookie jika diarahkan kembali ke login (berarti token cacat)
    if (authResult.redirectTo === '/auth/login') {
      response.cookies.delete('session_token');
    }
    
    return response;
  }

  // Loloskan
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

