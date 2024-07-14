import Banner from 'components/banner';
import Navbar from 'components/layout/navbar';
import { AuthProvider } from 'contexts/auth-context';
import { GeistSans } from 'geist/font/sans';
import { ensureStartsWith } from 'lib/utils';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME, STORE_PREFIX, SHOPIFY_ORIGIN_URL } = process.env;
const baseUrl = SHOPIFY_ORIGIN_URL ? SHOPIFY_ORIGIN_URL : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    }),
  icons: {
    icon: `/${STORE_PREFIX}/logo-icon.svg`
  },
  alternates: {
    canonical: './'
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-screen bg-white text-black selection:bg-primary-muted">
        <AuthProvider>
          {/* We need to have this wrapper div because the headless ui popover clickaway event is not working properly */}
          {/* https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430 */}
          <div className="flex h-screen flex-col">
            <header>
              <Banner />
              <Navbar />
            </header>
            <Suspense>
              <main>{children}</main>
            </Suspense>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
