import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { reactionCommerceProvider, ReactionCommerceProvider } from './provider'
import {
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  SHOP_ID,
  REACTION_CART_ID_COOKIE,
} from './const'

export { reactionCommerceProvider }
export type { ReactionCommerceProvider }

type ReactionConfig = CommerceConfig & {
  shopId: string
  anonymousCartTokenCookie: string
}

export const reactionCommerceConfig: ReactionConfig = {
  locale: 'en-us',
  anonymousCartTokenCookie: REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  cartCookie: REACTION_CART_ID_COOKIE,
  shopId: SHOP_ID,
}

export type ReactionCommerceConfig = Partial<ReactionConfig>

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
