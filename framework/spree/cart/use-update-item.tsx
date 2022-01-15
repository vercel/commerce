import type { MutationHook } from '@vercel/commerce/utils/types'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'
import type { UpdateItemHook } from '@vercel/commerce/types/cart'
import useCart from './use-cart'
import { useMemo } from 'react'
import { FetcherError, ValidationError } from '@vercel/commerce/utils/errors'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import type { SetQuantity } from '@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass'
import type { GraphQLFetcherResult } from '@vercel/commerce/api'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import normalizeCart from '../utils/normalizations/normalize-cart'
import debounce from 'lodash.debounce'
import ensureIToken from '../utils/tokens/ensure-itoken'
import createEmptyCart from '../utils/create-empty-cart'
import { setCartToken } from '../utils/tokens/cart-token'
import isLoggedIn from '../utils/tokens/is-logged-in'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<UpdateItemHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'cart',
    query: 'setQuantity',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useRemoveItem fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const { itemId, item } = input

    if (!item.quantity) {
      throw new ValidationError({
        message: 'Line item quantity needs to be provided.',
      })
    }

    let token: IToken | undefined = ensureIToken()

    if (!token) {
      const { data: spreeCartCreateSuccessResponse } = await createEmptyCart(
        fetch
      )

      setCartToken(spreeCartCreateSuccessResponse.data.attributes.token)
      token = ensureIToken()
    }

    try {
      const setQuantityParameters: SetQuantity = {
        line_item_id: itemId,
        quantity: item.quantity,
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
          methodPath: 'cart.setQuantity',
          arguments: [token, setQuantityParameters],
        },
      })

      return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data)
    } catch (updateItemError) {
      if (
        updateItemError instanceof FetcherError &&
        updateItemError.status === 404
      ) {
        const { data: spreeRetroactiveCartCreateSuccessResponse } =
          await createEmptyCart(fetch)

        if (!isLoggedIn()) {
          setCartToken(
            spreeRetroactiveCartCreateSuccessResponse.data.attributes.token
          )
        }

        // Return an empty cart. The user has to update the item again.
        // This is going to be a rare situation.

        return normalizeCart(
          spreeRetroactiveCartCreateSuccessResponse,
          spreeRetroactiveCartCreateSuccessResponse.data
        )
      }

      throw updateItemError
    }
  },
  useHook: ({ fetch }) => {
    const useWrappedHook: ReturnType<
      MutationHook<UpdateItemHook>['useHook']
    > = (context) => {
      const { mutate } = useCart()

      return useMemo(
        () =>
          debounce(async (input: UpdateItemHook['actionInput']) => {
            const itemId = context?.item?.id
            const productId = input.productId ?? context?.item?.productId
            const variantId = input.variantId ?? context?.item?.variantId
            const quantity = input.quantity

            if (!itemId || !productId || !variantId) {
              throw new ValidationError({
                message: 'Invalid input used for this operation',
              })
            }

            const data = await fetch({
              input: {
                item: {
                  productId,
                  variantId,
                  quantity,
                },
                itemId,
              },
            })

            await mutate(data, false)

            return data
          }, context?.wait ?? 500),
        [mutate, context]
      )
    }

    return useWrappedHook
  },
}
