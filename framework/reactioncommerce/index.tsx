import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { reactionCommerceProvider, ReactionCommerceProvider } from './provider'
import { REACTION_ANONYMOUS_CART_TOKEN_COOKIE, SHOP_ID } from './const'

export { reactionCommerceProvider }
export type { ReactionCommerceProvider }

export const reactionCommerceConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  shopId: SHOP_ID,
}

export type ReactionCommerceConfig = Partial<CommerceConfig>

export type ReactionCommerceProps = {
  children?: ReactNode
  locale: string
} & ReactionCommerceConfig

export function CommerceProvider({
  children,
  ...config
}: ReactionCommerceProps) {
  return (
    <CoreCommerceProvider
      // TODO: Fix this type
      provider={reactionCommerceProvider as any}
      config={{ ...reactionCommerceConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
