import { HookFetcher, HookDeps } from '@lib/commerce/utils/types'
import useCommerceCart from '@lib/commerce/cart/use-cart'
import type { Cart } from '../api/cart'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
}

export type { Cart }

export const fetcher: HookFetcher<Cart | null, HookDeps[]> = (
  options,
  _,
  fetch
) => {
  return fetch({
    url: options?.url,
    query: options?.query,
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useCart = () => {
    const cart = useCommerceCart<Cart | null>(
      [defaultOpts.url, undefined],
      customFetcher,
      { revalidateOnFocus: false }
    )

    // Uses a getter to only calculate the prop when required
    // cart.data is also a getter and it's better to not trigger it early
    Object.defineProperty(cart, 'isEmpty', {
      get() {
        return Object.values(cart.data?.line_items ?? {}).every(
          (items) => !items.length
        )
      },
      set: (x) => x,
    })

    return cart
  }

  useCart.extend = extendHook

  return useCart
}

export default extendHook(fetcher)
