import { MutationHook } from '@commerce/utils/types'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'
import useCart from '@commerce/cart/use-cart'
import { useCallback } from 'react'
import getCredentials from '@framework/api/utils/getCredentials'
import { LineItem } from '@commercelayer/js-sdk'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: { item, quantity } }) {
    const credentials = getCredentials()
    const orderId = localStorage.getItem('CL_ORDER')
    if (orderId && item.id) {
      const lineItem = (await LineItem.build({
        id: item.id,
      })
        .withCredentials(credentials)
        // @ts-ignore
        .update({ quantity }, null, { rawResponse: true })) as any
      const attributes = lineItem.data.attributes
      return {
        id: lineItem.data.id,
        name: attributes.name,
        productId: item.productId,
        variantId: item.variantId,
        quantity: attributes.quantity,
        price: attributes.unit_amount_float,
        variant: {
          id: lineItem.data.id,
          name: attributes.name,
          sku: lineItem.data.sku_code,
          price: attributes.unit_amount_float,
          image: {
            url: `/commercelayer_assets/${item.variantId}_FLAT.png`,
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
    ({ item }) => {
      return async function updateItem(input) {
        return await fetch({ input: { item, ...input } })
      }
    },
}
