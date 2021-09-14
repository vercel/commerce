import { Customer } from '@commerce/types/customer'
import { MedusaCustomer } from '@framework/types'

export function normalizeCustomer(customer: MedusaCustomer): Customer {
  return {
    firstName: customer.first_name,
    lastName: customer.last_name,
  }
}
