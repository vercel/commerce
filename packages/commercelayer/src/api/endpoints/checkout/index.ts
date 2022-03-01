import { GetAPISchema, createEndpoint, CommerceAPI } from '@vercel/commerce/api'
import checkoutEndpoint from '@vercel/commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '@vercel/commerce/types/checkout'
import getCheckout from './get-checkout'

export const handlers: CheckoutEndpoint['handlers'] = { getCheckout }

export type CheckoutAPI = GetAPISchema<CommerceAPI, CheckoutSchema>
export type CheckoutEndpoint = CheckoutAPI['endpoint']

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
