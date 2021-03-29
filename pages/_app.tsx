import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head, Layout } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

type LayoutT = FC & { Layout: typeof Layout }

const Noop: FC = ({ children }) => <>{children}</>
cl
export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as LayoutT).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
