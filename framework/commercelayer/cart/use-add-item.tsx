import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import { MutationHook } from '@commerce/utils/types'
import { LineItem, Order } from '@commercelayer/js-sdk'
import getCredentials from '@framework/api/utils/getCredentials'
import useCart from '@framework/cart/use-cart'
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
    if (orderId && input.sizeId) {
      !localOrderId && localStorage.setItem('CL_ORDER_ID', orderId)
      const lineItem = await LineItem.withCredentials(credentials).create(
        {
          skuCode: input.sizeId,
          order: Order.build({ id: orderId }),
          quantity: 1,
          reference: input.variantId,
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
          sku: input.sizeId,
          price: attributes.unit_amount_float,
          image: {
            url: `/commercelayer_assets/${input.variantId}_FLAT.png`,
            altText: 'Black Women Long Sleeve Shirt',
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
