import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCart, { UseCart } from '@vercel/commerce/cart/use-cart'
import Cookies from 'js-cookie'
import { NormalizeCart } from '../api/utils/normalize'
import { STORE_ID } from '../const'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: ''
  },
  async fetcher({ fetch }) {
    const fromCookies = Cookies.get('cart_id');

    if(!fromCookies) {

      const { data } = await fetch({ query : `/stores/${STORE_ID}/carts`, method: "POST", body: { id: '' } })
      
      Cookies.set('cart_id', data.id)
      
      return NormalizeCart(data)
    }

    else {
      const { data } = await fetch({ query : `/carts/${fromCookies}?include=cart_items` })
      return NormalizeCart(data)
    }
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: true, ...input?.swrOptions },
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
