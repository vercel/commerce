import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { MutationHook } from '@vercel/commerce/utils/types'
import CLSdk from '@commercelayer/sdk'
import getCredentials, {
  getOrganizationSlug,
} from '../api/utils/getCredentials'
import useCart from '../cart/use-cart'
import { useCallback } from 'react'
import getContentData from '../api/utils/getContentData'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input }) {
    const localOrderId = localStorage.getItem('CL_ORDER_ID')
    const { accessToken, endpoint } = getCredentials()
    const organization = getOrganizationSlug(endpoint).organization
    const sdk = CLSdk({
      accessToken,
      organization,
    })
    const orderId =
      localOrderId || (accessToken && (await sdk.orders.create({})).id)
    if (orderId && input.variantId) {
      !localOrderId && localStorage.setItem('CL_ORDER_ID', orderId)
      const [product] = await getContentData(input.productId)
      const [image] = product.images
      const lineItem = await sdk.line_items.create({
        sku_code: input.variantId,
        order: sdk.orders.relationship(orderId),
        quantity: 1,
        reference: input.productId,
        _update_quantity: true,
      })
      return {
        id: lineItem.id,
        name: lineItem.name,
        productId: input.productId,
        variantId: input.variantId,
        quantity: lineItem.quantity,
        price: lineItem.unit_amount_float,
        variant: {
          id: lineItem.id,
          name: lineItem.name,
          sku: input.variantId,
          price: lineItem.unit_amount_float,
          image,
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
