import { createEndpoint } from '@commerce/api'
import type { CommerceAPI } from '@commerce/api'
import type { GetAPISchema } from '@commerce/api'
import checkoutEndpoint from '@commerce/api/endpoints/checkout'
import type { CheckoutSchema } from '@commerce/types/checkout'
import type { SpreeApiProvider } from '@framework/api'
import checkout from './checkout'

export type CheckoutAPI = GetAPISchema<
  CommerceAPI<SpreeApiProvider>,
  CheckoutSchema
>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = { checkout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
