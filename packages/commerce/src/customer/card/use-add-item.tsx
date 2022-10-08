import type { HookFetcherFn, MutationHook } from '../../utils/types'
import type { AddItemHook } from '../../types/customer/card'
import type { Provider } from '../..'

import { useHook, useMutationHook } from '../../utils/use-hook'
import { mutationFetcher } from '../../utils/default-fetcher'

export type UseAddItem<
  H extends MutationHook<AddItemHook<any>> = MutationHook<AddItemHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<AddItemHook> = mutationFetcher

const fn = (provider: Provider) => provider.customer?.card?.useAddItem!

const useAddItem: UseAddItem = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useAddItem
