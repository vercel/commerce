import { FC } from 'react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SSRProvider, OverlayProvider } from 'react-aria'
import '@assets/global.css'
import '@assets/tailwind.css'
import '@assets/utils.css'
import config from '../config.json'
import Head from 'next/head'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head>
        <link
          rel="manifest"
          href="/site.webmanifest"
          importance="low"
          key="site-manifest"
        />
      </Head>
      <DefaultSeo {...config.seo} />
      <ThemeProvider>
        <SSRProvider>
          <OverlayProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </OverlayProvider>
        </SSRProvider>
      </ThemeProvider>
    </>
  )
}
