import { createEndpoint } from '@vercel/commerce/api'
import checkoutEndpoint from '@vercel/commerce/api/endpoints/checkout'

import type { GetAPISchema } from '@vercel/commerce/api'
import type { CheckoutSchema } from '@vercel/commerce/types/checkout'

import getCheckout from './get-checkout'
import submitCheckout from './submit-checkout'

import type { OlistAPI } from '../..'

export type CheckoutAPI = GetAPISchema<OlistAPI, CheckoutSchema>
export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = {
  getCheckout,
  submitCheckout,
}

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
