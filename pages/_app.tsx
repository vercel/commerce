import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React, { FC, useEffect } from 'react';
import { Head } from 'src/components/common';
import 'keen-slider/keen-slider.min.css'; 
import '../src/styles/main.scss';


const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ThemeProvider>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
