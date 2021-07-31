import { GetAPISchema, createEndpoint } from '@commerce/api'
import checkoutEndpoint from '@commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '../../../types/checkout'
import type { ShopifyAPI } from '../..'
import checkout from './checkout'

export type CheckoutAPI = GetAPISchema<ShopifyAPI, CheckoutSchema>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = { checkout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
