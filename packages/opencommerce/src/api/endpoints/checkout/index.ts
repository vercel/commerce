import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import checkoutEndpoint from '@vercel/commerce/api/endpoints/checkout'
import type { OpenCommerceAPI } from '../..'

import submitCheckout from './submit-checkout'
import getCheckout from './get-checkout'
import { CheckoutSchema } from '@vercel/commerce/types/checkout'

export type CheckoutAPI = GetAPISchema<OpenCommerceAPI, CheckoutSchema>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = {
  submitCheckout,
  getCheckout,
}

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
