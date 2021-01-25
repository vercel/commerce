import { CommerceError } from '@commerce/utils/errors'
import { HookFetcher } from '@commerce/utils/types'
import fetchGraphqlApi from '@framework/api/utils/fetch-graphql-api'
import useCartAddItem from '@commerce/cart/use-add-item'
import useCart from './use-cart'
import { useCallback } from 'react'
import { cartFragment } from '../api/fragments/cart'
import {
  AddItemToOrderMutation,
  AddItemToOrderMutationVariables,
  ErrorResult,
} from '@framework/schema'

export const addItemToOrderMutation = /* GraphQL */ `
  mutation addItemToOrder($variantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
      __typename
      ...Cart
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
  ${cartFragment}
`

export type AddItemInput = {
  productId?: number
  variantId: number
  quantity?: number
}

export const fetcher: HookFetcher<
  AddItemToOrderMutation,
  AddItemToOrderMutationVariables
> = (options, { variantId, quantity }, fetch) => {
  if (quantity && (!Number.isInteger(quantity) || quantity! < 1)) {
    throw new CommerceError({
      message: 'The item quantity has to be a valid integer greater than 0',
    })
  }

  return fetch({
    ...options,
    query: addItemToOrderMutation,
    variables: { variantId, quantity: quantity || 1 },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useAddItem = () => {
    const { mutate } = useCart()
    const fn = useCartAddItem({}, customFetcher)

    return useCallback(
      async function addItem(input: AddItemInput) {
        const { addItemToOrder } = await fn({
          quantity: input.quantity || 1,
          variantId: input.variantId,
        })
        if (addItemToOrder.__typename === 'Order') {
          await mutate({ addItemToOrder }, false)
        } else {
          throw new CommerceError({
            message: (addItemToOrder as ErrorResult).message,
          })
        }
        return { addItemToOrder }
      },
      [fn, mutate]
    )
  }

  useAddItem.extend = extendHook

  return useAddItem
}

export default extendHook(fetcher)
