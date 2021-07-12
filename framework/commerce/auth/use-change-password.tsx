import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { Provider } from '..'
import { ChangePasswordHook } from '@commerce/types/change-password'

export type UseChangePassword<
  H extends MutationHook<ChangePasswordHook<any>> = MutationHook<ChangePasswordHook>
  > = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<ChangePasswordHook> = mutationFetcher

const fn = (provider: Provider) => provider.auth?.useChangePassword!

const useChangePassword: UseChangePassword = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useChangePassword
