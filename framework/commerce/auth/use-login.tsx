import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { Provider } from '..'

export type UseLogin<
  H extends MutationHook<any, any, any> = MutationHook<null, {}, {}>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<null, {}> = mutationFetcher

const fn = (provider: Provider) => provider.auth?.useLogin!

const useLogin: UseLogin = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useLogin
