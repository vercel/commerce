import '@assets/global.css'
import '@assets/tailwind.css'
import '@assets/utils.css'
import 'animate.css'
import { FC } from 'react'

import type { AppProps } from 'next/app'

import { CommerceProvider } from '@lib/bigcommerce'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <CommerceProvider locale="en-us">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CommerceProvider>
    </>
  )
}
