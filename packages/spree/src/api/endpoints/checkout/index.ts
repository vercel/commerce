import { createEndpoint } from '@vercel/commerce/api'
import type { GetAPISchema, CommerceAPI } from '@vercel/commerce/api'
import checkoutEndpoint from '@vercel/commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '@vercel/commerce/types/checkout'
import getCheckout from './get-checkout'
import type { SpreeApiProvider } from '../..'

export type CheckoutAPI = GetAPISchema<
  CommerceAPI<SpreeApiProvider>,
  CheckoutSchema
>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = { getCheckout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
