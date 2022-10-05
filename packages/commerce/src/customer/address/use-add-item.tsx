import type { HookFetcherFn, MutationHook } from '../../utils/types'
import type { AddItemHook } from '../../types/customer/address'
import type { Provider } from '../..'

import { useHook, useMutationHook } from '../../utils/use-hook'
import { mutationFetcher } from '../../utils/default-fetcher'

export type UseAddItem<
  H extends MutationHook<AddItemHook> = MutationHook<AddItemHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<AddItemHook> = mutationFetcher

const fn = (provider: Provider) => provider.customer?.address?.useAddItem!

const useAddItem: UseAddItem = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useAddItem
