import { MutationHook } from '@commerce/utils/types'
import useRemoveItem from '@commerce/cart/use-remove-item'
import type { UseRemoveItem } from '@commerce/cart/use-remove-item'
import type { RemoveItemHook } from '@commerce/types/cart'
import useCart from './use-cart'
import { useCallback } from 'react'
import normalizeCart from '../utils/normalize-cart'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { IQuery } from '@spree/storefront-api-v2-sdk/types/interfaces/Query'
import getCartToken from '../utils/get-cart-token'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    url: '__UNUSED__',
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useRemoveItem fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const { itemId: lineItemId } = input

    const token: IToken = { orderToken: getCartToken() }
    const removeItemParameters: IQuery = {
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
        methodPath: 'cart.removeItem',
        arguments: [token, lineItemId, removeItemParameters],
      },
    })

    return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data)
  },
  useHook:
    ({ fetch }) =>
    () => {
      console.log('useRemoveItem useHook called.')

      const { mutate } = useCart()

      return useCallback(async (input) => {
        const data = await fetch({ input: { itemId: input.id } })

        await mutate(data, false)

        return data
      }, [])
    },
}
