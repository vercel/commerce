import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useCart, { UseCart } from '@commerce/cart/use-cart'
import { normalizeCart } from '@framework/utils/normalizers/normalize-cart'
import { CommerceError } from '@commerce/utils/errors'

import Cookies from 'js-cookie'
import { MEDUSA_CART_ID_COOKIE } from '@framework/const'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ fetch }) {
    const cart_id = Cookies.get(MEDUSA_CART_ID_COOKIE)

    /**
     * If cart already exits, then try to fetch it
     */
    if (cart_id) {
      try {
        const existingCartResponse = await fetch({
          query: 'carts',
          method: 'retrieve',
          variables: { cart_id: cart_id },
        })

        if (existingCartResponse?.cart) {
          return normalizeCart(existingCartResponse.cart)
        }
      } catch (e) {
        /**
         * noop: If the cart_id does not exits, then we
         * continue and create a new cart and set a new
         * CART_COOKIE
         */
      }
    }

    const newCartResponse = await fetch({
      query: 'carts',
      method: 'create',
      variables: {},
    })

    if (newCartResponse?.cart) {
      Cookies.set(MEDUSA_CART_ID_COOKIE, newCartResponse.cart.id, {
        expires: 30,
      })
      return normalizeCart(newCartResponse.cart)
    }
    throw new CommerceError({ message: 'Medusa cart error' })
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
                return (response.data?.lineItems.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
