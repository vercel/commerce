import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { Provider } from '..'

export type RemoveItemInput = {
  id: string | number
}

export type UseRemoveItem<
  H extends MutationHook<any, any, any> = MutationHook<
    any | null,
    { wishlist?: any },
    RemoveItemInput,
    {}
  >
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<any | null, {}> = mutationFetcher

const fn = (provider: Provider) => provider.wishlist?.useRemoveItem!

const useRemoveItem: UseRemoveItem = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useRemoveItem
