import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { LogoutHook } from '../types/logout'
import type { Provider } from '..'

export type UseLogout<
  H extends MutationHook<LogoutHook<any>> = MutationHook<LogoutHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<LogoutHook> = mutationFetcher

const fn = (provider: Provider) => provider.auth?.useLogout!

const useLogout: UseLogout = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useLogout
