import { Cart, CartItemBody, LineItem } from '../types'

import api from '../api/cart'

export default function useAddItem() {
  return (item: CartItemBody): Cart => {
    api.add(item as LineItem)

    return (null as unknown) as Cart
  }
}
