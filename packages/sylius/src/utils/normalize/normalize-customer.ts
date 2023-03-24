import { Customer } from '@vercel/commerce/types/customer'
import { SyliusCustomer } from 'types/customer'

//customer has no type in commerce - SyliusCustomer type is defined in types/customer.ts
export const normalizeCustomer = (
  syliusCustomer: SyliusCustomer
): Customer => ({
  firstName: syliusCustomer.firstName,
  lastName: syliusCustomer.lastName,
  email: syliusCustomer.email,
})
