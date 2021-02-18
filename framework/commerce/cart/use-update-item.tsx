import useHook, { useHookHandler } from '../utils/use-hook'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { Cart, CartItemBody, LineItem, UpdateCartItemBody } from '../types'
import type { Provider } from '..'
import debounce from 'lodash.debounce'

// Input expected by the action returned by the `useUpdateItem` hook
export type UpdateItemInput<T extends CartItemBody> = T & {
  id: string
}

export type UseUpdateItem<
  H extends MutationHook<any, any, any> = MutationHook<
    Cart,
    {
      item?: LineItem
      wait?: number
    },
    UpdateItemInput<CartItemBody>,
    UpdateCartItemBody<CartItemBody>
  >
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<any> = async ({
  options,
  input,
  fetch,
}) => {
  return fetch({ ...options, body: input })
}

const fn = (provider: Provider) => provider.cart?.useUpdateItem!

const useUpdateItem: UseUpdateItem = (input = {}) => {
  const handler = useHookHandler(fn, fetcher)
  return debounce(handler(useHook(fn, fetcher))(input), input.wait ?? 500)
}

export default useUpdateItem
