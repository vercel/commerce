import { MutationHook, MutationHookContext } from '@commerce/utils/types'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'
import { handler as removeItem } from './use-remove-item'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import Cookies from 'js-cookie'
import { MEDUSA_CART_ID_COOKIE } from '@framework/const'
import { normalizeCart } from '@framework/utils/normalizers/normalize-cart'
import { LineItem, UpdateItemHook } from '@commerce/types/cart'
import { useCallback } from 'react'
import { debounce } from 'lodash'
import useCart from '@commerce/cart/use-cart'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: 'carts',
    method: 'updateItem',
  },
  async fetcher({ input: { itemId, item }, options, fetch }) {
    if (Number.isInteger(item.quantity)) {
      if (item.quantity! < 1) {
        return removeItem.fetcher!({
          options: removeItem.fetchOptions,
          input: { itemId },
          fetch,
        })
      }
    } else if (item.quantity) {
      throw new ValidationError({
        message: 'The item quantity has to be a valid integer',
      })
    }

    const cart_id = Cookies.get(MEDUSA_CART_ID_COOKIE)

    const data = await fetch({
      ...options,
      variables: {
        cart_id: cart_id,
        line_id: itemId,
        payload: { quantity: item.quantity },
      },
    })

    if (data.cart) {
      return normalizeCart(data.cart)
    } else {
      throw new CommerceError({ message: 'No cart was found' })
    }
  },
  useHook:
    ({ fetch }: MutationHookContext<UpdateItemHook>) =>
    <T extends LineItem | undefined = undefined>(
      ctx: {
        item?: T
        wait?: number
      } = {}
    ) => {
      const { item } = ctx
      const { mutate } = useCart()

      return useCallback(
        debounce(async (input: UpdateItemActionInput<T>) => {
          const itemId = input.id ?? item?.id
          const productId = input.productId ?? item?.productId
          const variantId = input.productId ?? item?.variantId

          if (!itemId || !productId || !variantId) {
            throw new ValidationError({
              message: 'Invalid input used for this operation',
            })
          }

          const data = await fetch({
            input: {
              itemId,
              item: { productId, variantId, quantity: input.quantity },
            },
          })
          await mutate(data, false)
          return data
        }, ctx.wait ?? 500),
        [fetch, mutate]
      )
    },
}
