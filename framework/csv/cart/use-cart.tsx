import { Cart } from '@framework/types'

export interface CartResponse {
  data: Cart | null
  isLoading: boolean
  isEmpty: boolean
}

export default function useCart(): CartResponse {
  return {
    data: null,
    isLoading: false,
    isEmpty: true,
  }
}
