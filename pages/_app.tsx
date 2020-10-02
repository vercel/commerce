import '@assets/global.css'
import React from 'react'
import { UIProvider } from '@components/ui/context'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </>
  )
}
