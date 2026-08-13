import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WebMCPTools } from "components/webmcp-tools";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const { SITE_NAME } = process.env;

// TODO(gaojude): no origin-trial token is registered for demo.vercel.store yet, so
// WebMCP only works in a browser with chrome://flags/#enable-webmcp-testing enabled.
const webmcpOriginTrialToken = process.env.WEBMCP_ORIGIN_TRIAL_TOKEN;

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
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        {webmcpOriginTrialToken ? (
          <meta httpEquiv="origin-trial" content={webmcpOriginTrialToken} />
        ) : null}
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
          <WebMCPTools />
        </CartProvider>
      </body>
    </html>
  );
}
