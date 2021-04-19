import { Cart, CartItemBody } from '../types'

export default function useRemoveItem() {
  return (_item: CartItemBody): Cart | null => {
    return null
  }
}
