import type { CustomerAddressSchema } from '@vercel/commerce/types/customer/address'
import type { OrdercloudAPI } from '../../..'

import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import customerAddressEndpoint from '@vercel/commerce/api/endpoints/customer/address'

import getAddresses from './get-addresses'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

export type CustomerAddressAPI = GetAPISchema<
  OrdercloudAPI,
  CustomerAddressSchema
>
export type CustomerAddressEndpoint = CustomerAddressAPI['endpoint']

export const handlers: CustomerAddressEndpoint['handlers'] = {
  getAddresses,
  addItem,
  updateItem,
  removeItem,
}

const customerAddressApi = createEndpoint<CustomerAddressAPI>({
  handler: customerAddressEndpoint,
  handlers,
})

export default customerAddressApi
