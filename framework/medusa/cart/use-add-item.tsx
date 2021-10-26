import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import { CommerceError } from '@commerce/utils/errors'
import { MutationHook } from '@commerce/utils/types'
import { MEDUSA_CART_ID_COOKIE } from '@framework/const'
import { MedusaAddItemProps } from '@framework/types'
import type { AddItemHook } from '../types/cart'
import { normalizeCart } from '@framework/utils/normalizers/normalize-cart'
import { useCart } from 'framework/local/cart'
import Cookies from 'js-cookie'
import { useCallback } from 'react'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: '/api/cart',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    if (item.quantity && !Number.isInteger(item.quantity)) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await fetch({
      ...options,
      body: { item },
    })

    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCart()

      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })

          await mutate(data, false)

          return data
        },
        [fetch, mutate]
      )
    },
}
