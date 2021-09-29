import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
// import type { SubscriptionsHook } from '../types/subscriptions'
import type { Provider } from '../'

export type UseSubscribe<
    H extends MutationHook<any> = MutationHook<any>
    > = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<any> = mutationFetcher

const fn = (provider: Provider) => provider.subscriptions?.useSubscriptions!

const useSubscribe: any = (...args: any) => {
    const hook = useHook(fn)
    return useMutationHook({ fetcher, ...hook })(...args)
}

export default useSubscribe

