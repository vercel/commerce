import { FC } from 'react'
import type { AppProps } from 'next/app'
import { SSRProvider, OverlayProvider } from 'react-aria'
import { ThemeProvider } from 'next-themes'
import '@assets/global.css'
import '@assets/tailwind.css'
import '@assets/utils.css'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <ThemeProvider>
      <SSRProvider>
        <OverlayProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </OverlayProvider>
      </SSRProvider>
    </ThemeProvider>
  )
}
