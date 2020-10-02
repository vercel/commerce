import type { AppProps } from 'next/app'
import '@assets/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
