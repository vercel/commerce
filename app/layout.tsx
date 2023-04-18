import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

import Navbar from 'components/layout/navbar';
import { SITE_CREATOR, SITE_CREATOR_URL, SITE_NAME } from 'lib/constants';

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  twitter: {
    card: 'summary_large_image',
    creator: SITE_CREATOR,
    site: SITE_CREATOR_URL
  }
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-black selection:bg-teal-300 dark:bg-black dark:text-white dark:selection:bg-fuchsia-600 dark:selection:text-white">
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
