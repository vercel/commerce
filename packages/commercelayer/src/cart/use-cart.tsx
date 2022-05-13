import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCart, { UseCart } from '@vercel/commerce/cart/use-cart'
import CLSdk from '@commercelayer/sdk'
import getCredentials, {
  getOrganizationSlug,
} from '../api/utils/getCredentials'
import normalizeLineItems from '../api/utils/normalizeLineItems'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    const id = localStorage.getItem('CL_ORDER_ID') || ''
    const credentials = getCredentials()
    const organization = getOrganizationSlug(credentials.ENDPOINT).organization
    const sdk = CLSdk({
      accessToken: credentials.accessToken,
      organization,
    })
    if (id && credentials.accessToken) {
      const order = await sdk.orders.retrieve(id, { include: ['line_items'] })
      const orderStatus = order.status
      if (orderStatus && ['pending', 'draft'].includes(orderStatus)) {
        const lineItems = order.line_items
          ? normalizeLineItems(order.line_items)
          : []
        return {
          id,
          createdAt: order.created_at,
          currency: { code: order.currency_code },
          taxesIncluded: '',
          lineItems,
          lineItemsSubtotalPrice: '',
          subtotalPrice: order.subtotal_amount_float,
          totalPrice: order.total_amount_float,
        }
      } else if (id) {
        localStorage.removeItem('CL_ORDER_ID')
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
                return response.data?.lineItems.length === 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
