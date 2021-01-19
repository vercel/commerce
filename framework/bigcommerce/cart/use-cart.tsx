
import { normalizeCart } from '../lib/normalize'
import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceCart, { CartInput } from '@commerce/cart/use-cart'
import type { Cart as BigCommerceCart } from '../api/cart'
import update from "@framework/lib/immutability"

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'GET',
}

type UseCartResponse = BigCommerceCart & Cart

export const fetcher: HookFetcher<UseCartResponse | null , CartInput> = (
  options,
  { cartId },
  fetch
) => {
  return cartId ? fetch({ ...defaultOpts, ...options }) : null
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<UseCartResponse | null, CartInput>
) {
  const useCart = () => {
    const response = useCommerceCart(defaultOpts, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    })

    // Uses a getter to only calculate the prop when required
    // response.data is also a getter and it's better to not trigger it early
    Object.defineProperty(response, 'isEmpty', {
      get() {
        return Object.values(response.data?.line_items ?? {}).every(
          (items) => !items.length
        )
      },
      set: (x) => x,
    })



    return response.data ? update(response, {
      data: { $set: normalizeCart(response.data ) }
    }) : response
  }

  useCart.extend = extendHook

  return useCart
}

export default extendHook(fetcher)
