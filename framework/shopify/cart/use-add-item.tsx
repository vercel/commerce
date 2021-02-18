import type { MutationHandler } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import useCart from './use-cart'
import { ShopifyProvider } from '..'
import { AddCartItemBody, CartItemBody } from '@commerce/types'
import { Cart } from '@framework/types'
import {
  checkoutLineItemAddMutation,
  getCheckoutId,
  getCheckoutQuery,
} from '@framework/utils'
import { checkoutToCart } from './utils'

const defaultOpts = {
  query: checkoutLineItemAddMutation,
}

export default useAddItem as UseAddItem<ShopifyProvider, CartItemBody>

export const handler: MutationHandler<Cart, {}, AddCartItemBody> = {
  fetchOptions: {
    query: checkoutLineItemAddMutation,
  },
  async fetcher({ input, options, fetch }) {
    const item = input.item ?? input
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await fetch<any, any>({
      ...defaultOpts,
      ...options,
      variables: {
        lineItems: [
          {
            variantId: item.variantId,
            quantity: item.quantity ?? 1,
          },
        ],
        checkoutId: getCheckoutId(),
      },
    })

    return checkoutToCart(data.checkoutLineItemsAdd)
  },
  useHook() {
    const { mutate } = useCart()
    return async function addItem({ input, fetch }) {
      const data = await fetch({ input })
      await mutate(data, false)
      return data
    }
  },
}
