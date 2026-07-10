import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// PERBAIKAN 1: Arahkan impor ke folder 'server' yang baru kita buat (menggantikan 'middleware')
import { verifySession } from './server/auth';

// PERBAIKAN 2: Ubah nama fungsi dari 'middleware' menjadi 'proxy' untuk membungkam peringatan Turbopack
export async function proxy(request: NextRequest) {
  const authResult = await verifySession(request);

  if (!authResult.isValid && authResult.redirectTo) {
    const response = NextResponse.redirect(new URL(authResult.redirectTo, request.url));

    if (authResult.redirectTo === '/auth/login') {
      response.cookies.delete('session_token');
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

