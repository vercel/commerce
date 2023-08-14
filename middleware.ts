import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['sv', 'en'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'sv',
  // Dismissing this during, review when going to prod.
  localeDetection: false
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|studio|_next|.*\\..*).*)']
};