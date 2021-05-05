import { Cart } from '../types'

import api from '../api/cart'

export interface CartResponse {
  data: Cart | null
  isLoading: boolean
  isEmpty: boolean
}

export default function useCart(): CartResponse {
  const cart = api.get()

  console.log({ cart })

  return {
    data: null,
    isLoading: false,
    isEmpty: true,
  }
}
