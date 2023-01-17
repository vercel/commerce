import { SYLIUS_CART_TOKEN } from '../../const'

export const getCartToken = () => localStorage.getItem(SYLIUS_CART_TOKEN)

export const setCartToken = (token: string | null) => {
  if (!token) {
    localStorage.removeItem(SYLIUS_CART_TOKEN)
  } else {
    localStorage.setItem(SYLIUS_CART_TOKEN, token)
  }
}
