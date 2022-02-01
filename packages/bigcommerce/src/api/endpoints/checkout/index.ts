import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import checkoutEndpoint from '@vercel/commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '../../../types/checkout'
import type { BigcommerceAPI } from '../..'
import getCheckout from './get-checkout'

export type CheckoutAPI = GetAPISchema<BigcommerceAPI, CheckoutSchema>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = { getCheckout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
