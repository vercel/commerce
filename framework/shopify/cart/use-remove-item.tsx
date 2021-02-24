import { useCallback } from 'react'
import { useCommerce } from '../index'

const useRemoveItem = () => {
  const { checkout, client, updateCheckout } = useCommerce()

  return useCallback(
    async function removeItem({ id }: { id: string }) {
      const cart = await client?.checkout.removeLineItems(checkout.id, [id])
      updateCheckout(cart)
      return cart
    },
    [checkout, client]
  )
}

export default useRemoveItem
