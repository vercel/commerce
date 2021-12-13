import useAddItem from '@commerce/cart/use-add-item'
import type { UseAddItem } from '@commerce/cart/use-add-item'
import type { MutationHook } from '@commerce/utils/types'
import { useCallback } from 'react'
import useCart from './use-cart'
import type { AddItemHook } from '@commerce/types/cart'
import normalizeCart from '../utils/normalizations/normalize-cart'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import type { AddItem } from '@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass'
import { setCartToken } from '../utils/tokens/cart-token'
import ensureIToken from '../utils/tokens/ensure-itoken'
import createEmptyCart from '../utils/create-empty-cart'
import { FetcherError } from '@commerce/utils/errors'
import isLoggedIn from '../utils/tokens/is-logged-in'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'cart',
    query: 'addItem',
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

    let token: IToken | undefined = ensureIToken()

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

    if (!token) {
      const { data: spreeCartCreateSuccessResponse } = await createEmptyCart(
        fetch
      )

      setCartToken(spreeCartCreateSuccessResponse.data.attributes.token)
      token = ensureIToken()
    }

    try {
      const { data: spreeSuccessResponse } = await fetch<
        GraphQLFetcherResult<IOrder>
      >({
        variables: {
          methodPath: 'cart.addItem',
          arguments: [token, addItemParameters],
        },
      })

      return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data)
    } catch (addItemError) {
      if (addItemError instanceof FetcherError && addItemError.status === 404) {
        const { data: spreeRetroactiveCartCreateSuccessResponse } =
          await createEmptyCart(fetch)

        if (!isLoggedIn()) {
          setCartToken(
            spreeRetroactiveCartCreateSuccessResponse.data.attributes.token
          )
        }

        // Return an empty cart. The user has to add the item again.
        // This is going to be a rare situation.

        return normalizeCart(
          spreeRetroactiveCartCreateSuccessResponse,
          spreeRetroactiveCartCreateSuccessResponse.data
        )
      }

      throw addItemError
    }
  },
  useHook: ({ fetch }) => {
    const useWrappedHook: ReturnType<MutationHook<AddItemHook>['useHook']> =
      () => {
        const { mutate } = useCart()

        return useCallback(
          async (input) => {
            const data = await fetch({ input })

            await mutate(data, false)

            return data
          },
          [mutate]
        )
      }

    return useWrappedHook
  },
}
