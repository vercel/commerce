import { normalizeCart } from '../lib/normalize'
import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useResponse from '@commerce/utils/use-response'
import useCommerceCart, { CartInput } from '@commerce/cart/use-cart'
import type { Cart as BigcommerceCart } from '../api/cart'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'GET',
}

type UseCartResponse = BigcommerceCart & Cart

export const fetcher: HookFetcher<UseCartResponse | null, CartInput> = (
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
    const res = useResponse(response, {
      normalizer: normalizeCart,
      descriptors: {
        isEmpty: {
          get() {
            return Object.values(response.data?.line_items ?? {}).every(
              (items) => !items.length
            )
          },
          enumerable: true,
        },
      },
    })

    return res
  }

  useCart.extend = extendHook

  return useCart
}

export default extendHook(fetcher)
