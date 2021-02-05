import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import useCommerceLogout from '@commerce/use-logout'
import useCustomer from '../customer/use-customer'
import customerAccessTokenDeleteMutation from '@framework/utils/mutations/customer-access-token-delete'
import {
  getCustomerToken,
  setCustomerToken,
} from '@framework/utils/customer-token'

const defaultOpts = {
  query: customerAccessTokenDeleteMutation,
}

export const fetcher: HookFetcher<null> = (options, _, fetch) => {
  return fetch({
    ...defaultOpts,
    ...options,
    variables: {
      customerAccessToken: getCustomerToken(),
    },
  }).then((d) => setCustomerToken(null))
}

export function extendHook(customFetcher: typeof fetcher) {
  const useLogout = () => {
    const { mutate } = useCustomer()
    const fn = useCommerceLogout<null>(defaultOpts, customFetcher)

    return useCallback(
      async function login() {
        const data = await fn(null)
        await mutate(null, false)
        return data
      },
      [fn]
    )
  }

  useLogout.extend = extendHook

  return useLogout
}

export default extendHook(fetcher)
