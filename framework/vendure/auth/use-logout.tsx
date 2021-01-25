import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import useCommerceLogout from '@commerce/use-logout'
import useCustomer from '../customer/use-customer'
import { LogoutMutation } from '@framework/schema'

export const logoutMutation = /* GraphQL */ `
  mutation logout {
    logout {
      success
    }
  }
`

export const fetcher: HookFetcher<LogoutMutation> = (options, _, fetch) => {
  return fetch({
    ...options,
    query: logoutMutation,
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useLogout = () => {
    const { mutate } = useCustomer()
    const fn = useCommerceLogout<LogoutMutation>({}, customFetcher)

    return useCallback(
      async function logout() {
        const data = await fn(null)
        await mutate(null as any, false)
        return data
      },
      [fn]
    )
  }

  useLogout.extend = extendHook

  return useLogout
}

export default extendHook(fetcher)
