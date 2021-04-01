import useCart, { UseCart } from '@commerce/cart/use-cart'
import { Customer } from '@commerce/types'
import { SWRHook } from '@commerce/utils/types'
import { normalizeCart } from '../utils/normalize'
// import { getCustomerQuery, getCustomerToken } from '../utils'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    query: 'cart',
    method: 'get',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>({
      ...options,
    })
    return data ? normalizeCart(data) : null
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
