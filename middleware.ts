import { getOrigin, isLoggedIn } from 'lib/shopify/auth';
import { NextRequest, NextResponse } from 'next/server';

const URL_PREFIXES = ['/transmissions', '/engines', '/transfer-cases', '/remanufactured-engines'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/account')) {
    const origin = getOrigin(request);

    return await isLoggedIn(request, origin);
  }

  if (URL_PREFIXES.some((url) => request.nextUrl.pathname.startsWith(url))) {
    // /transmissions/bmw/x5 would turn into /transmissions-bmw-x5
    const requestPathname = request.nextUrl.pathname.split('/').filter(Boolean).join('-');
    const searchString = request.nextUrl.search;

    return NextResponse.rewrite(
      new URL(
        searchString ? `/search/${requestPathname}${searchString}` : `/search/${requestPathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    '/account/:path*',
    '/transmissions/:path*',
    '/engines/:path*',
    '/transfer-cases/:path*',
    '/remanufactured-engines/:path*'
  ]
};
