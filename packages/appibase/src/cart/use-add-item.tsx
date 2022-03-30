import { useCallback } from 'react';
import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { MutationHook } from '@vercel/commerce/utils/types'
import Cookies from 'js-cookie'
import { NormalizeCart } from '../api/utils/normalize'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: item, options, fetch }) {

    const fromCookies = Cookies.get('cart_id');
    
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
