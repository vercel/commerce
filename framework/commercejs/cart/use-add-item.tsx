import type { AddItemHook } from '@commerce/types/cart'
import type { MutationHook } from '@commerce/utils/types'
import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import type { CommercejsCart } from '../types/cart'
import { normalizeCart } from '../utils/normalize-cart'
import useCart from './use-cart'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'add',
  },
  async fetcher({ input: item, options, fetch }) {
    // Frontend stringifies variantId even if undefined.
    const hasVariant = !item.variantId || item.variantId !== 'undefined'

    const getVariantVariable = () => {
      if (!hasVariant) return {}
      // Variant group and option gets sent as one Id with parts separated by a dash -
      const [variantGroup, variantOption] = item.variantId.split('-')
      return {
        [variantGroup]: variantOption,
      }
    }

    const variables = [
      item.productId,
      item?.quantity || 1,
      getVariantVariable(),
    ]
    const { cart } = await fetch<{ cart: CommercejsCart }>({
      query: options.query,
      method: options.method,
      variables,
    })
    return normalizeCart(cart)
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCart()

      return useCallback(
        async function addItem(input) {
          const cart = await fetch({ input })
          await mutate(cart, false)
          return cart
        },
        [mutate]
      )
    },
}
