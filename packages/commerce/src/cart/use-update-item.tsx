import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { UpdateItemHook } from '../types/cart'
import type { Provider } from '..'

export type UseUpdateItem<
  H extends MutationHook<UpdateItemHook> = MutationHook<UpdateItemHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<UpdateItemHook> = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useUpdateItem!

const useUpdateItem: UseUpdateItem = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useUpdateItem
