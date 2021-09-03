import type { MutationHook } from '@commerce/utils/types'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'
import type { UpdateItemHook } from '@commerce/types/cart'
import useCart from './use-cart'
import { useCallback } from 'react'
import { ValidationError } from '@commerce/utils/errors'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import type { SetQuantity } from '@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass'
import getCartToken from '../utils/get-cart-token'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import normalizeCart from '../utils/normalize-cart'
import debounce from 'lodash.debounce'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<UpdateItemHook> = {
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

    const { itemId, item } = input

    if (!item.quantity) {
      throw new ValidationError({
        message: 'Line item quantity needs to be provided.',
      })
    }

    const token: IToken = { orderToken: getCartToken() }
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
  },
  useHook:
    ({ fetch }) =>
    (context) => {
      console.log('useUpdateItem useHook called.')

      const { mutate } = useCart()

      return useCallback(
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
        []
      )
    },
}
