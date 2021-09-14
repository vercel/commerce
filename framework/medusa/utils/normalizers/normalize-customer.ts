import { Customer } from '@commerce/types/customer'
import { Customer as MedusaCustomer } from '@medusajs/medusa-js/lib/types'

export function normalizeCustomer(customer: MedusaCustomer): Customer {
  return {
    firstName: customer.first_name,
    lastName: customer.last_name,
  }
}
