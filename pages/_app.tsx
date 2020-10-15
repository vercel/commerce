import '@assets/global.css'
import '@assets/tailwind.css'
import '@assets/utils.css'
import 'animate.css'
import { FC } from 'react'
import { Head } from '@components/core'
import type { AppProps } from 'next/app'
import { ManagedUIContext } from '@components/ui/context'
import { CommerceProvider } from '@lib/bigcommerce'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <CommerceProvider locale="en-us">
      <Head />
      <ManagedUIContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </CommerceProvider>
  )
}
