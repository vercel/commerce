import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode, Suspense } from "react"; // Added Suspense
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          {/* PR Change: Wrapped children in a container for consistent padding and Suspense for better loading states */}
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="h-screen w-full animate-pulse bg-neutral-100" />}>
              {children}
            </Suspense>
            <Toaster closeButton position="bottom-right" />
            <WelcomeToast />
          </main>
          {/* PR Change: Added a placeholder for a Footer component */}
          <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}