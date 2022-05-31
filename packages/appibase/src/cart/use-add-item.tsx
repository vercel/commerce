import { useCallback } from 'react';
import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { MutationHook } from '@vercel/commerce/utils/types'
import Cookies from 'js-cookie'
import type { AppibaseCartItem } from '../types'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: item, fetch }) {

    const fromCookies = Cookies.get('cart_id');

    const { data } = await fetch({ query : `/carts/${fromCookies}?include=cart_items` })
    const foundItem = data.cart_items.data.find((i: AppibaseCartItem) => String(i.item.data.id) === String(item.variantId));

    if(foundItem) {
      await fetch({
        query : `cart_items`,
        method: 'PATCH',
        body: {
          id: foundItem.id,
          type: 'cart_item',
          quantity: String(foundItem.quantity + 1)
        }
      })
    }
    else
      await fetch({
        query : `/carts/${fromCookies}/cart_items`,
        method: 'POST',
        body: {
          quantity: 1,
          item: {
            data : {
              type: 'product',
              id:  item.variantId
            }
          }
        }
      })
    return;
  },
  useHook:
    ({ fetch }) =>
    () => {
      return useCallback(async function addItem(input) {
        const data = await fetch({ input });
        return data;
      }, [fetch]);
    },
}
