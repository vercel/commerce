import { Noto_Serif_JP } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode, Suspense } from 'react';

import { SupportedLocale } from 'components/layout/navbar/language-control';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
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

const noto = Noto_Serif_JP({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '400', '600'],
  variable: '--font-noto'
});

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ja' }];
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale?: SupportedLocale };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${params?.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale} className={`${cinzel.variable} ${alpina.variable} ${noto.variable}`}>
      <body className="bg-dark text-white selection:bg-green-800 selection:text-green-400">
        <NextIntlClientProvider locale={params?.locale} messages={messages}>
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
