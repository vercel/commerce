import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { SubmitCheckoutHook } from '../types/checkout'
import type { Provider } from '..'

import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'

export type UseSubmitCheckout<
  H extends MutationHook<
    SubmitCheckoutHook<any>
  > = MutationHook<SubmitCheckoutHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<SubmitCheckoutHook> = mutationFetcher

const fn = (provider: Provider) => provider.checkout?.useSubmitCheckout!

const useSubmitCheckout: UseSubmitCheckout = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useSubmitCheckout
