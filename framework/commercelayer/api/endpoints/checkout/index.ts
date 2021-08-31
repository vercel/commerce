import { GetAPISchema, createEndpoint, CommerceAPI } from '@commerce/api'
import checkoutEndpoint from '@commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '@commerce/types/checkout'
import type { CommercelayerAPI } from '../..'
import checkout from './checkout'

export const handlers: CheckoutEndpoint['handlers'] = { checkout }

export type CheckoutAPI = GetAPISchema<CommerceAPI, CheckoutSchema>
export type CheckoutEndpoint = CheckoutAPI['endpoint']

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
