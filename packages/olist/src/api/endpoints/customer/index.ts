import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import customerEndpoint from '@vercel/commerce/api/endpoints/customer'

import type { CustomerSchema } from '@vercel/commerce/types/customer'

import { OlistAPI } from '../../../api'
import getLoggedInCustomer from './get-logged-in-customer'

import type { Handler as HandlerAPI } from '../../../types/api'

export type CustomerAPI = GetAPISchema<OlistAPI, CustomerSchema>

export type CustomerEndpoint = CustomerAPI['endpoint']

export const handlers: CustomerEndpoint['handlers'] = { getLoggedInCustomer }

export type Handler = { body: any } & HandlerAPI

const customerApi = createEndpoint<CustomerAPI>({
  handler: customerEndpoint,
  handlers,
})

export default customerApi
