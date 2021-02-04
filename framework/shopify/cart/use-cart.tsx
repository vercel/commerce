import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'

import useResponse from '@commerce/utils/use-response'
import useCommerceCart, { CartInput } from '@commerce/cart/use-cart'
import getCheckoutQuery from '@framework/utils/queries/get-checkout-query'

import { Cart } from '@commerce/types'
import { checkoutToCart, checkoutCreate } from './utils'

const defaultOpts = {
  query: getCheckoutQuery,
}

export const fetcher: HookFetcher<Cart | null, CartInput> = async (
  options,
  { cartId: checkoutId },
  fetch
) => {
  let checkout

  if (checkoutId) {
    const data = await fetch({
      ...defaultOpts,
      ...options,
      variables: {
        checkoutId,
      },
    })
    checkout = data?.node
  }

  if (checkout?.completedAt || !checkoutId) {
    checkout = await checkoutCreate(fetch)
  }

  return checkoutToCart({ checkout })
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
