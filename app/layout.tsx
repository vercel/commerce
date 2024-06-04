import '@styles/globals.scss';
import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
