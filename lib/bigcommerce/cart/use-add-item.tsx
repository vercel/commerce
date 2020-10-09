import { useCallback } from 'react'
import { HookFetcher } from '@lib/commerce/utils/types'
import { default as useCartAddItem } from '@lib/commerce/cart/use-add-item'
import type { ItemBody, AddItemBody } from '../api/cart'
import { Cart, useCart } from '.'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'POST',
}

export type UpdateItemInput = ItemBody

export const fetcher: HookFetcher<Cart, AddItemBody> = (
  options,
  { item },
  fetch
) => {
  if (
    item.quantity &&
    (!Number.isInteger(item.quantity) || item.quantity! < 1)
  ) {
    throw new Error(
      'The item quantity has to be a valid integer greater than 0'
    )
  }

  return fetch({
    url: options.url!,
    method: options.method!,
    body: { item },
  })
}

function extend(customFetcher: typeof fetcher) {
  const useAddItem = () => {
    const { mutate } = useCart()
    const fn = useCartAddItem<Cart, AddItemBody>(defaultOpts, customFetcher)

    return useCallback(
      async function addItem(input: UpdateItemInput) {
        const data = await fn({ item: input })
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useAddItem.extend = extend

  return useAddItem
}

export default extend(fetcher)
