import { SYLIUS_CUSTOMER_ROUTE } from '../../const'

export const getCustomerRoute = () =>
  localStorage.getItem(SYLIUS_CUSTOMER_ROUTE)

export const setCustomerRoute = (route: string | null) => {
  if (!route) {
    localStorage.removeItem(SYLIUS_CUSTOMER_ROUTE)
  } else {
    localStorage.setItem(SYLIUS_CUSTOMER_ROUTE, route)
  }
}
