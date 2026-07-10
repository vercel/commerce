import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { ShopifyProviderWrapper } from "components/shopify-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Oswald } from "next/font/google";
import { ReactNode } from "react";
import { OpenPanelComponent } from "@openpanel/nextjs";
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

// Re-applies a persisted explicit theme before anything paints, so a
// dark-mode user never sees a light flash (and vice versa). Runs as the
// first thing in <body>; when nothing is stored, no attribute is set and
// the CSS prefers-color-scheme rules decide.
const themeInitScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();
  
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || "mock.shop";
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "mock-token";

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-night text-bone">
        <OpenPanelComponent
          clientId={
            process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ||
            "bf0a3fd5-43a3-478c-aaa7-ac8079d828e2"
          }
          apiUrl="/api/op"
          scriptUrl="/api/op/op1.js"
          trackScreenViews={true}
          trackOutgoingLinks={true}
          trackAttributes={true}
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ShopifyProviderWrapper
          storeDomain={storeDomain}
          storefrontToken={storefrontToken}
        >
          <CartProvider cartPromise={cart}>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </ShopifyProviderWrapper>
      </body>
    </html>
  );
}

