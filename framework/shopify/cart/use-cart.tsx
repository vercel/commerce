import { useMemo } from 'react'
import useCommerceCart, { UseCart } from '@commerce/cart/use-cart'
import { SWRHook } from '@commerce/utils/types'
import { GetCartHook } from '../types/cart'
import { GetCartQueryVariables, QueryRoot } from '../schema'
import { normalizeCart, getCartQuery, setCheckoutUrlCookie } from '../utils'
import Cookies from 'js-cookie'
import { SHOPIFY_CART_ID_COOKIE } from '@framework/const'

export default useCommerceCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: getCartQuery,
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    if (cartId) {
      let { cart } = await fetch<QueryRoot, GetCartQueryVariables>({
        ...options,
        variables: { cartId },
      })
      if (cart) {
        setCheckoutUrlCookie(cart.checkoutUrl)
        return normalizeCart(cart)
      } else {
        Cookies.remove(SHOPIFY_CART_ID_COOKIE)
      }
    }
    return null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })
      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.lineItems?.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
