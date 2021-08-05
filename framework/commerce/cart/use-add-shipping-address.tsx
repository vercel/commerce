import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { AddShippingAddressHook } from '../types/cart'
import type { Provider } from '..'

export type UseAddShippingAddress<
  H extends MutationHook<AddShippingAddressHook<any>> = MutationHook<AddShippingAddressHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<AddShippingAddressHook> = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useAddShippingAddress!

const useRemoveItem: UseAddShippingAddress = (input) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(input)
}

export default useRemoveItem
