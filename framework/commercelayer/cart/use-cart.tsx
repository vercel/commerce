import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useCart, { UseCart } from '@commerce/cart/use-cart'
import { Order } from '@commercelayer/js-sdk'
import getCredentials from '@framework/api/utils/getCredentials'
import normalizeLineItems from '../api/utils/normalizeLineItems'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    const id = localStorage.getItem('CL_ORDER_ID') || ''
    const credentials = getCredentials()
    if (id && credentials.accessToken) {
      const clOrder = await Order.withCredentials(credentials)
        .includes('lineItems')
        .find(id, { rawResponse: true })
      const attributes = clOrder.data.attributes
      const lineItems = clOrder?.included
        ? normalizeLineItems(clOrder?.included)
        : []
      return {
        id,
        createdAt: attributes.created_at,
        currency: { code: attributes.currency_code },
        taxesIncluded: '',
        lineItems,
        lineItemsSubtotalPrice: '',
        subtotalPrice: attributes.subtotal_amount_float,
        totalPrice: attributes.total_amount_float,
      }
    }
    return {
      id: '',
      createdAt: '',
      currency: { code: '' },
      taxesIncluded: '',
      lineItems: [],
      lineItemsSubtotalPrice: '',
      subtotalPrice: 0,
      totalPrice: 0,
    }
  },
  useHook:
    ({ useData }) =>
    () => {
      const response = useData()
      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return response.data.lineItems.length === 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
