import { CartProvider, useCart as useCommerceCart } from '@lib/commerce/cart'
import type { Cart } from '../api/cart'

export type { Cart }

export { CartProvider }

export function useCart() {
  const cart = useCommerceCart<Cart | null>()

  // Uses a getter to only calculate the prop when required
  // cart.data is also a getter and it's better to not trigger it early
  Object.defineProperty(cart, 'isEmpty', {
    get() {
      return Object.values(cart.data?.line_items ?? {}).every(
        (items) => !items.length
      )
    },
    set: (x) => x,
  })

  return cart
}
