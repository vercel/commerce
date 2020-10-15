import '@assets/global.css'
import '@assets/tailwind.css'
import '@assets/utils.css'
import 'animate.css'
import { FC } from 'react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import config from '../config.json'

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
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
