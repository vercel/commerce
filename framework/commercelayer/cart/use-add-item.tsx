import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import { MutationHook } from '@commerce/utils/types'
import { LineItem, Order } from '@commercelayer/js-sdk'
import getCredentials from '../api/utils/getCredentials'
import useCart from '../cart/use-cart'
import { useCallback } from 'react'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    const localOrderId = localStorage.getItem('CL_ORDER_ID')
    const credentials = getCredentials()
    const orderId =
      localOrderId ||
      (credentials.accessToken &&
        (await Order.withCredentials(credentials).create({})).id)
    if (orderId && input.variantId) {
      !localOrderId && localStorage.setItem('CL_ORDER_ID', orderId)
      const lineItem = await LineItem.withCredentials(credentials).create(
        {
          skuCode: input.variantId,
          order: Order.build({ id: orderId }),
          quantity: 1,
          reference: input.productId,
          _update_quantity: 1,
        },
        // @ts-ignore
        { rawResponse: true }
      )
      const attributes = lineItem.data.attributes
      return {
        id: lineItem.data.id,
        name: attributes.name,
        productId: input.productId,
        variantId: input.variantId,
        quantity: attributes.quantity,
        price: attributes.unit_amount_float,
        variant: {
          id: lineItem.data.id,
          name: attributes.name,
          sku: input.variantId,
          price: attributes.unit_amount_float,
          image: {
            url: `https://data.commercelayer.app/vercel-provider/${input.productId}_FLAT.png`,
            altText: attributes.name,
            width: 1000,
            height: 1000,
          },
        },
      }
    }
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()
      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch]
      )
    },
}
