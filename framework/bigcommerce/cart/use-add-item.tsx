import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCartAddItem from '@commerce/cart/use-add-item'
import { normalizeCart } from '../lib/normalize'
import type {
  ItemBody,
  AddItemBody,
  Cart as BigcommerceCart,
} from '../api/cart'
import useCart from './use-cart'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'POST',
}

export type AddItemInput = ItemBody

export const fetcher: HookFetcher<Cart, AddItemBody> = async (
  options,
  { item },
  fetch
) => {
  if (
    item.quantity &&
    (!Number.isInteger(item.quantity) || item.quantity! < 1)
  ) {
    throw new CommerceError({
      message: 'The item quantity has to be a valid integer greater than 0',
    })
  }

  const data = await fetch<BigcommerceCart>({
    ...defaultOpts,
    ...options,
    body: { item },
  })

  return normalizeCart(data)
}

export function extendHook(customFetcher: typeof fetcher) {
  const useAddItem = () => {
    const { mutate } = useCart()
    const fn = useCartAddItem(defaultOpts, customFetcher)

    return useCallback(
      async function addItem(input: AddItemInput) {
        const data = await fn({ item: input })
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useAddItem.extend = extendHook

  return useAddItem
}

export default extendHook(fetcher)
