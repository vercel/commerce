import Navbar from 'components/layout/navbar';
import { Locale, i18n } from 'i18n-config';
import localFont from 'next/font/local';
import { ReactNode, Suspense } from 'react';

import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

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
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE
      }
    })
};

// Font files can be colocated inside of `app`
const cinzel = localFont({
  src: '../fonts/Cinzel-Regular.ttf',
  display: 'swap',
  variable: '--font-cinzel'
});

const alpina = localFont({
  src: [
    {
      path: '../fonts/GT-Alpina-Regular-Trial.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/GT-Alpina-Bold-Trial.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-alpina'
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className={`${cinzel.variable} ${alpina.variable}`}>
      <body className="bg-dark text-white selection:bg-green-800 selection:text-green-400">
        <div className="mx-auto max-w-screen-2xl">
          <Navbar lang={params.lang as Locale} />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
