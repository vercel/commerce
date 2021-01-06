import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCartUpdateItem from '@commerce/cart/use-update-item'
import type { ItemBody, UpdateItemBody } from '../api/cart'
import { fetcher as removeFetcher } from './use-remove-item'
import useCart, { Cart } from './use-cart'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'PUT',
}

export type UpdateItemInput = Partial<{ id: string } & ItemBody>

export const fetcher: HookFetcher<Cart | null, UpdateItemBody> = (
  options,
  { itemId, item },
  fetch
) => {
  if (Number.isInteger(item.quantity)) {
    // Also allow the update hook to remove an item if the quantity is lower than 1
    if (item.quantity! < 1) {
      return removeFetcher(null, { itemId }, fetch)
    }
  } else if (item.quantity) {
    throw new CommerceError({
      message: 'The item quantity has to be a valid integer',
    })
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { itemId, item },
  })
}

function extendHook(customFetcher: typeof fetcher, cfg?: { wait?: number }) {
  const useUpdateItem = (item?: any) => {
    const { mutate } = useCart()
    const fn = useCartUpdateItem<Cart | null, UpdateItemBody>(
      defaultOpts,
      customFetcher
    )

    return useCallback(
      debounce(async (input: UpdateItemInput) => {
        const data = await fn({
          itemId: input.id ?? item?.id,
          item: {
            productId: input.productId ?? item?.product_id,
            variantId: input.productId ?? item?.variant_id,
            quantity: input.quantity,
          },
        })
        await mutate(data, false)
        return data
      }, cfg?.wait ?? 500),
      [fn, mutate]
    )
  }

  useUpdateItem.extend = extendHook

  return useUpdateItem
}

export default extendHook(fetcher)
