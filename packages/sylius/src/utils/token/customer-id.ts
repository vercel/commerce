import { SYLIUS_CUSTOMER_ID } from '../../const'

export const getCustomerId = () => localStorage.getItem(SYLIUS_CUSTOMER_ID)

export const setCustomerId = (id: string | null) => {
  if (!id) {
    localStorage.removeItem(SYLIUS_CUSTOMER_ID)
  } else {
    localStorage.setItem(SYLIUS_CUSTOMER_ID, id)
  }
}
