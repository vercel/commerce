import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { Cart, CartItemBody, LineItem, UpdateCartItemBody } from '../types'
import type { Provider } from '..'

/**
 * Input expected by the action returned by the `useUpdateItem` hook
 */
export type UpdateItemInput<T extends CartItemBody> = T & {
  id: string
}

export type UseUpdateItem<
  H extends MutationHook<any, any, any> = MutationHook<
    Cart | null,
    {
      item?: LineItem
      wait?: number
    },
    UpdateItemInput<CartItemBody>,
    UpdateCartItemBody<CartItemBody>
  >
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<
  Cart | null,
  UpdateCartItemBody<CartItemBody>
> = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useUpdateItem!

const useUpdateItem: UseUpdateItem = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useUpdateItem
