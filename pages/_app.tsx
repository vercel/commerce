import '@assets/global.css'
import '@assets/tailwind.css'
import '@assets/utils.css'
import 'animate.css'
import { FC } from 'react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SSRProvider, OverlayProvider } from 'react-aria'
import config from '../config.json'
import Head from 'next/head'
import { CommerceProvider } from '@lib/bigcommerce'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </Head>
      <DefaultSeo {...config.seo} />
      <CommerceProvider locale="en-us">
        <ThemeProvider>
          <SSRProvider>
            <OverlayProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </OverlayProvider>
          </SSRProvider>
        </ThemeProvider>
      </CommerceProvider>
    </>
  )
}
