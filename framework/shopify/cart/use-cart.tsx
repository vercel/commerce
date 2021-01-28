import { useCommerce } from '../index'

export function emptyHook() {
  const { checkout } = useCommerce()
  const { lineItems, totalPriceV2 } = checkout || {}

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

export default emptyHook
