import { FC } from 'react'
import type { AppProps } from 'next/app'
import '@assets/global.css'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
