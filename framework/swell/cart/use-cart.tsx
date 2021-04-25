import useCart, { UseCart } from '@commerce/cart/use-cart'
import { Cart } from '@commerce/types'
import { SWRHook } from '@commerce/utils/types'
import { normalizeCart } from '../utils/normalize'
import { checkoutCreate, checkoutToCart } from './utils'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<Cart | null> = {
  fetchOptions: {
    query: 'cart',
    method: 'get',
  },
  async fetcher({ options, fetch }) {
    const cart = await checkoutCreate(fetch)

    return cart ? normalizeCart(cart) : null
  },
  useHook: ({ useData }) => (input) => {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input?.swrOptions,
      },
    })
  },
}
