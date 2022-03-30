import { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'
import Cookies from 'js-cookie'
import { NormalizeCart } from '../api/utils/normalize'
import useCart from './use-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: item, options, fetch }) {
    await fetch({
      query : `cart_items`,
      method: 'DELETE',
      body: item.id
    })

    const fromCookies = Cookies.get('cart_id');
    const { data } = await fetch({ query : `/carts/${fromCookies}?include=cart_items` })
    return NormalizeCart(data)
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()

      return useCallback(async function removeItem(input) {
        const data = await fetch({ input });

        await mutate(data, true)

        return data;
      }, [fetch, mutate]);
    },
}
