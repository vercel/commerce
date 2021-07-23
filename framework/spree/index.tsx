import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

// import { provider, Provider } from './provider'
import { createProvider, Provider } from './createProvider'

// export { provider }

// TODO: Below is probably not needed. Expect default values to be set by NextJS Commerce and be ok for now.
// export const saleorConfig: CommerceConfig = {
//   locale: 'en-us',
//   cartCookie: Const.CHECKOUT_ID_COOKIE,
// }

export type Config = {
  store: {
    host: string
  }
} & CommerceConfig // This is the type that holds any custom values specifically for the Spree Framework.

export type SpreeProps = {
  children: ReactNode
  provider: Provider
  config: Config
} & Config

export function CommerceProvider({ children, ...config }: SpreeProps) {
  console.log('CommerceProvider called')

  // TODO: Make sure this doesn't get called all the time. If it does, useMemo.
  const provider = createProvider({ config })

  return (
    <CoreCommerceProvider provider={provider} config={config}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce<Provider>()
