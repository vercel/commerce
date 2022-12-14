import { Customer } from '@vercel/commerce/types/customer'
import { SyliusCustomer } from '../../types/customer'

export const normalizeCustomer = (syliusCustomer: SyliusCustomer): Customer => {
  return {
    firstName: syliusCustomer.firstName,
    lastName: syliusCustomer.lastName,
    email: syliusCustomer.email,
  }
}
