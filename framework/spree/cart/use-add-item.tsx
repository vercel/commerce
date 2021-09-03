import useAddItem from '@commerce/cart/use-add-item'
import type { UseAddItem } from '@commerce/cart/use-add-item'
import type { MutationHook } from '@commerce/utils/types'
import { useCallback } from 'react'
import useCart from './use-cart'
import type { AddItemHook } from '@commerce/types/cart'
import normalizeCart from '../utils/normalize-cart'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import type { AddItem } from '@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass'
import getCartToken from '../utils/get-cart-token'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '__UNUSED__',
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useAddItem fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const { quantity, productId, variantId } = input

    const safeQuantity = quantity ?? 1

    const token: IToken = { orderToken: getCartToken() }
    const addItemParameters: AddItem = {
      variant_id: variantId,
      quantity: safeQuantity,
      include: [
        'line_items',
        'line_items.variant',
        'line_items.variant.product',
        'line_items.variant.product.images',
        'line_items.variant.images',
        'line_items.variant.option_values',
        'line_items.variant.product.option_types',
      ].join(','),
    }

    const { data: spreeSuccessResponse } = await fetch<
      GraphQLFetcherResult<IOrder>
    >({
      variables: {
        methodPath: 'cart.addItem',
        arguments: [token, addItemParameters],
      },
    })

    return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data)
  },
  useHook:
    ({ fetch }) =>
    () => {
      console.log('useAddItem useHook called.')

      const { mutate } = useCart()

      return useCallback(async (input) => {
        const data = await fetch({ input })

        await mutate(data, false)

        return data
      }, [])
    },
}
