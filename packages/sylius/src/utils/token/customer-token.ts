import { SYLIUS_CUSTOMER_TOKEN } from '../../const'

export const getCustomerToken = () =>
  localStorage.getItem(SYLIUS_CUSTOMER_TOKEN)

export const setCustomerToken = (token: string | null) => {
  if (!token) {
    localStorage.removeItem(SYLIUS_CUSTOMER_TOKEN)
  } else {
    localStorage.setItem(SYLIUS_CUSTOMER_TOKEN, token)
  }
}
