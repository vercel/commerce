import type { HookFetcherFn, MutationHook } from '../../utils/types'
import type { UpdateItemHook } from '../../types/customer/address'
import type { Provider } from '../..'

import { useHook, useMutationHook } from '../../utils/use-hook'
import { mutationFetcher } from '../../utils/default-fetcher'

export type UseUpdateItem<
  H extends MutationHook<UpdateItemHook> = MutationHook<UpdateItemHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<UpdateItemHook> = mutationFetcher

const fn = (provider: Provider) => provider.customer?.address?.useUpdateItem!

const useUpdateItem: UseUpdateItem = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useUpdateItem
