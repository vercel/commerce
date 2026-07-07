import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Oswald } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const SITE_NAME = process.env.SITE_NAME || "Lone Elk Coffee Company";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} — Fresh-Roasted on Demand`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Premium small-batch coffee, fresh-roasted on demand for outdoor athletes, ruckers, and anyone who carries the weight.",
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
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${oswald.variable}`}
    >
      <body className="bg-night text-bone">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
