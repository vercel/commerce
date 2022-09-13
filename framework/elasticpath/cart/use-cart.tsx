import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useCart, { UseCart } from '@commerce/cart/use-cart'
import epClient from '../utils/ep-client'
import normalizeCart from '../utils/normalize-cart'
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({fetch}) {
    const {data:cartData} = await epClient.Cart().Get();
    const {data:cartItems} = await epClient.Cart().Items();
    const cartDetails =  await normalizeCart(cartData, cartItems);
    console.log(cartDetails)
    cartDetails && setCookie('cartId', cartDetails.id);
    return cartDetails ;
  },
  useHook: ({ useData }) => (input) => {
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
