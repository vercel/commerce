import { useCommerce } from '../index'
import useCart, { UseCart, FetchCartInput } from '@commerce/cart/use-cart'
import type { Cart } from '../types'

// export default useCart as UseCart<typeof handler>
export default useCart as UseCart

export const handler = () => {
  const { checkout } = useCommerce()
  const { lineItems, totalPriceV2 } = checkout || {}

  console.log(checkout)

  return {
    data: {
      subTotal: totalPriceV2?.amount || 0,
      total: totalPriceV2?.amount || 0,
      currency: {
        code: '',
      },
      line_items:
        lineItems?.map((item) => {
          return [
            {
              id: item.id,
              name: item.title,
              quantity: item.quantity,
            },
          ]
        }) || [],
      items:
        lineItems?.map((item) => {
          return {
            id: item.id,
            name: item.title,
            images: [{ url: '/jacket.png' }],
            url: '/',
            quantity: item.quantity,
            productId: item.id,
            variantId: item.id,
          }
        }) || [],
    },
    isEmpty: false,
    isLoading: false,
  }
}
