import { getOrigin, isLoggedIn } from 'lib/shopify/auth';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/account')) {
    console.log('Running Account middleware');
    const origin = getOrigin(request);
    return await isLoggedIn(request, origin);
  }
}

export const config = {
  matcher: ['/account/:path*']
};
