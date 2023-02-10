import { Customer } from '@vercel/commerce/types/customer'

//customer has no type in commerce - SyliusCustomer type is defined in types/customer.ts
export const normalizeCustomer = (syliusCustomer: any): Customer => {
  return {
    firstName: syliusCustomer.firstName,
    lastName: syliusCustomer.lastName,
    email: syliusCustomer.email,
  }
}
