import { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'
import { NormalizeCart } from '../api/utils/normalize'
import Cookies from 'js-cookie'
import useCart from './use-cart'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    await fetch({
      query : `cart_items`,
      method: 'PATCH',
      body: { 
        id: input.item.id,
        type: 'cart_item',
        quantity: String(input.quantity)
      }
    })

    const fromCookies = Cookies.get('cart_id');
    const { data } = await fetch({ query : `/carts/${fromCookies}?include=cart_items` })
    return NormalizeCart(data)
    
  },
  useHook:
    ({ fetch }) =>
    ({ item }) => {
      const { mutate } = useCart()

      return useCallback(async function updateItem(input) {
        const data = await fetch({ input: { item, quantity: input.quantity } });

        await mutate(data, true)
        
        return data;
      }, [fetch, mutate]);
    },
}
