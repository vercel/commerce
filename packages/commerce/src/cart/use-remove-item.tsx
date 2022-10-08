import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { RemoveItemHook } from '../types/cart'
import type { Provider } from '..'

export type UseRemoveItem<
  H extends MutationHook<RemoveItemHook<any>> = MutationHook<RemoveItemHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<RemoveItemHook> = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useRemoveItem!

const useRemoveItem: UseRemoveItem = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useRemoveItem
