import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

import { useRouter } from 'next/router'
import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const { locale = 'en-US' } = useRouter()
  return (
    <>
      <Head />
      <ManagedUIContext>
        <CommerceProvider locale={locale}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </CommerceProvider>
      </ManagedUIContext>
    </>
  )
}
