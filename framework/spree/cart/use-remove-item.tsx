import type { MutationHook } from '@commerce/utils/types'
import useRemoveItem from '@commerce/cart/use-remove-item'
import type { UseRemoveItem } from '@commerce/cart/use-remove-item'
import type { RemoveItemHook } from '@commerce/types/cart'
import useCart from './use-cart'
import { useCallback } from 'react'
import normalizeCart from '../utils/normalizations/normalize-cart'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { IQuery } from '@spree/storefront-api-v2-sdk/types/interfaces/Query'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import ensureIToken from '../utils/tokens/ensure-itoken'
import createEmptyCart from '../utils/create-empty-cart'
import { setCartToken } from '../utils/tokens/cart-token'
import { FetcherError } from '@commerce/utils/errors'
import isLoggedIn from '../utils/tokens/is-logged-in'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'cart',
    query: 'removeItem',
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

    let token: IToken | undefined = ensureIToken()

    if (!token) {
      const { data: spreeCartCreateSuccessResponse } = await createEmptyCart(
        fetch
      )

      setCartToken(spreeCartCreateSuccessResponse.data.attributes.token)
      token = ensureIToken()
    }

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

    try {
      const { data: spreeSuccessResponse } = await fetch<
        GraphQLFetcherResult<IOrder>
      >({
        variables: {
          methodPath: 'cart.removeItem',
          arguments: [token, lineItemId, removeItemParameters],
        },
      })

      return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data)
    } catch (removeItemError) {
      if (
        removeItemError instanceof FetcherError &&
        removeItemError.status === 404
      ) {
        const { data: spreeRetroactiveCartCreateSuccessResponse } =
          await createEmptyCart(fetch)

        if (!isLoggedIn()) {
          setCartToken(
            spreeRetroactiveCartCreateSuccessResponse.data.attributes.token
          )
        }

        // Return an empty cart. This is going to be a rare situation.

        return normalizeCart(
          spreeRetroactiveCartCreateSuccessResponse,
          spreeRetroactiveCartCreateSuccessResponse.data
        )
      }

      throw removeItemError
    }
  },
  useHook: ({ fetch }) => {
    const useWrappedHook: ReturnType<MutationHook<RemoveItemHook>['useHook']> =
      () => {
        const { mutate } = useCart()

        return useCallback(
          async (input) => {
            const data = await fetch({ input: { itemId: input.id } })

            // Upon calling cart.removeItem, Spree returns the old version of the cart,
            // with the already removed line item. Invalidate the useCart mutation
            // to fetch the cart again.
            await mutate(data, true)

            return data
          },
          [mutate]
        )
      }

    return useWrappedHook
  },
}
