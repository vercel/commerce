import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook } from '../utils/types'
import type { AddItemHook } from '../types/wishlist'
import type { Provider } from '..'

export type UseAddItem<
  H extends MutationHook<AddItemHook<any>> = MutationHook<AddItemHook>
> = ReturnType<H['useHook']>

export const fetcher = mutationFetcher

const fn = (provider: Provider) => provider.wishlist?.useAddItem!

const useAddItem: UseAddItem = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useAddItem
