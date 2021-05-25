import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { Cart, LineItem, RemoveCartItemBody } from '../types'
import type { Provider } from '..'

/**
 * Input expected by the action returned by the `useRemoveItem` hook
 */
export type RemoveItemInput = {
  id: string
}

export type UseRemoveItem<
  H extends MutationHook<any, any, any> = MutationHook<
    Cart | null,
    { item?: LineItem },
    RemoveItemInput,
    RemoveCartItemBody
  >
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<
  Cart | null,
  RemoveCartItemBody
> = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useRemoveItem!

const useRemoveItem: UseRemoveItem = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useRemoveItem
