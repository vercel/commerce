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

export const fetcher: HookFetcher<Cart | null, CartInput> = async (
  options,
  { cartId },
  fetch
) => {
  const data = cartId
    ? await fetch<BigcommerceCart>({ ...defaultOpts, ...options })
    : null
  return data && normalizeCart(data)
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Cart | null, CartInput>
) {
  const useCart = () => {
    const response = useCommerceCart(defaultOpts, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    })
    const res = useResponse(response, {
      descriptors: {
        isEmpty: {
          get() {
            return (response.data?.lineItems.length ?? 0) <= 0
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
