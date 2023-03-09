export * from '@vercel/commerce/types/checkout'

import {
  GetCheckoutHook as CoreGetCheckoutHook,
  Checkout,
} from '@vercel/commerce/types/checkout'
import { FulfillmentGroup } from './cart'

export type GetCheckoutHook = Omit<CoreGetCheckoutHook, 'data'> & {
  data:
    | (Checkout & {
        hasShippingMethods?: boolean
        hasSelectedShippingMethod?: boolean
        totalDisplayAmount?: string
        shippingGroup?: FulfillmentGroup
      })
    | null
}
