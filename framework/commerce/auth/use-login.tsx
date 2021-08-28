import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { LoginHook } from '../types/login'
import type { Provider } from '..'

export type UseLogin<
  H extends MutationHook<LoginHook<any>> = MutationHook<LoginHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<LoginHook> = mutationFetcher

const fn = (provider: Provider) => provider.auth?.useLogin!

const useLogin: UseLogin = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useLogin
