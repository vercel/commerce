import { useCallback } from 'react'
import { LineItemToAdd } from 'shopify-buy'
import { useCommerce } from '../index'

type Options = {
  productId: number
  variantId: string | number
}

const useAddItem = () => {
  const { checkout, client, updateCheckout } = useCommerce()

  return useCallback(
    async function addItem(options: Options) {
      const lineItems: LineItemToAdd[] = [
        {
          variantId: `${options.variantId}`,
          quantity: 1,
        },
      ]

      const cart = await client?.checkout.addLineItems(checkout.id, lineItems)
      updateCheckout(cart)
      return cart
    },
    [checkout, client]
  )
}

export default useAddItem
