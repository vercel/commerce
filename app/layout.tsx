import Banner from 'components/banner';
import Navbar from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { ensureStartsWith } from 'lib/utils';
import { ReactNode, Suspense } from 'react';
import './globals.css';
import { AuthProvider } from 'contexts/auth-context';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
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
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-screen bg-white text-black selection:bg-primary-muted dark:bg-neutral-900 dark:text-white dark:selection:bg-primary-emphasis dark:selection:text-white">
        <AuthProvider>
          {/* We need to have this wrapper div because the headless ui popover clickaway event is not working properly */}
          {/* https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430 */}
          <div className="flex h-screen flex-col">
            <header>
              <Banner />
              <Navbar />
            </header>
            <Suspense>
              <main className="main group flex-1">{children}</main>
            </Suspense>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
