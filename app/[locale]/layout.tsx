import Footer from 'components/layout/footer/footer';
import Header from 'components/layout/header/header';
import { useLocale } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
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

// export function generateStaticParams() {
//   return supportedLanguages.locales.map((locale) => ({ locale: locale.id }));
// }

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
