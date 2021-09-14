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
    query: 'carts',
    method: 'addItem',
  },
  async fetcher({ input: item, options, fetch }) {
    if (item.quantity && !Number.isInteger(item.quantity)) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const variables: {
      cart_id: string
      payload: MedusaAddItemProps
    } = {
      cart_id: Cookies.get(MEDUSA_CART_ID_COOKIE)!,
      payload: {
        variant_id: item.variantId,
        quantity: item.quantity ?? 1,
      },
    }

    try {
      const data = await fetch({
        ...options,
        variables,
      })

      return normalizeCart(data.cart)
    } catch (e: any) {
      console.log(e)
      throw new CommerceError({ message: e.message })
    }
  },
  useHook:
    ({ fetch }) =>
    () => {
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
