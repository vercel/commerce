import Footer from 'components/layout/footer/footer';
import Header from 'components/layout/header/header';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { supportedLanguages } from '../../i18n-config';
import './globals.css';

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
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
