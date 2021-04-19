import { Cart, CartItemBody } from '../types'

export default function useAddItem() {
  return (_item: CartItemBody): Cart => {
    return (null as unknown) as Cart
  }
}
