import type { GetAPISchema } from '@commerce/api'
import type { CustomerSchema } from '../../types/customer'
import type { BigcommerceAPI } from '..'
import getLoggedInCustomer from './get-logged-in-customer'

export type CustomerAPI = GetAPISchema<BigcommerceAPI, CustomerSchema>

export type CustomerEndpoint = CustomerAPI['endpoint']

export const operations = { getLoggedInCustomer }
