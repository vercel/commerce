import { Lato, Noto_Serif_JP } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode, Suspense } from 'react';

import { SupportedLocale } from 'components/layout/navbar/language-control';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Analytics from './analytics';
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

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300'],
  variable: '--font-lato'
});

const noto = Noto_Serif_JP({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '400', '600'],
  variable: '--font-noto'
});

const locales = ['en', 'ja'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale?: SupportedLocale };
}) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur: string) => cur === params?.locale);
  if (!isValidLocale) notFound();

  if (params?.locale) {
    unstable_setRequestLocale(params.locale);
  }

  const messages = (await import(`../../messages/${params?.locale}.json`)).default;

  return (
    <html
      lang={params.locale}
      className={`${cinzel.variable} ${alpina.variable} ${noto.variable} ${lato.variable}`}
    >
      <body className="bg-dark text-white selection:bg-green-800 selection:text-green-400">
        <NextIntlClientProvider locale={params?.locale} messages={messages}>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
