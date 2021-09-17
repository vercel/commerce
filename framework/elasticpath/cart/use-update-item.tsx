import { MutationHook } from '@commerce/utils/types'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'
import epClient from '../utils/ep-client'
import normalizeCart from '../utils/normalize-cart'
import { useCallback } from 'react'
import useCart from './use-cart'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({input}) {
    return epClient.Cart().UpdateItem(input.id, input.quantity);
  },
  useHook: ({ fetch }) => (ctx) => {
    console.log(ctx);
    const { mutate } = useCart()

    return useCallback(
      async function addItem(input) {
        const cartItemsRes = await fetch({ 
          input: {
            ...ctx.item,
            ...input
          }
        });
        const {data:cartObj} = await epClient.Cart().Get();
        const cartData = normalizeCart(cartObj, cartItemsRes.data);
        await mutate(cartData, false);
        return cartData
      },
      [fetch, mutate]
    )
  }
}
