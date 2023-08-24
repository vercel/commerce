import PreviewProvider from '@/components/preview/preview-provider';
import { token } from '@/lib/sanity/sanity.fetch';
import { Analytics } from '@vercel/analytics/react';
import Footer from 'components/layout/footer/footer';
import Header from 'components/layout/header/header';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { supportedLanguages } from '../../../i18n-config';
import './../../globals.css';

export const metadata = {
  title: {
    default: process.env.SITE_NAME,
    template: `%s | ${process.env.SITE_NAME}`
  },
  description: process.env.SITE_DESCRIPTION,
  robots: {
    follow: true,
    index: true
  },
  ...(process.env.TWITTER_CREATOR &&
    process.env.TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: process.env.TWITTER_CREATOR,
        site: process.env.TWITTER_SITE
      }
    })
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export function generateStaticParams() {
  return supportedLanguages.locales.map((locale) => ({ locale: locale.id }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  let messages;

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const isDraftMode = draftMode().isEnabled;

  const layout = (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <Suspense>
            <main className="flex-1">{children}</main>
          </Suspense>
          <Suspense>
            <Footer locale={locale} />
          </Suspense>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );

  if (isDraftMode) {
    return <PreviewProvider token={token!}>{layout}</PreviewProvider>;
  }

  return layout;
}
