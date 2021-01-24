import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import useCommerceLogout from '@commerce/use-logout'
import useCustomer from './use-customer'

const defaultOpts = {
  url: '/api/bigcommerce/customers/logout',
  method: 'GET',
}

export const fetcher: HookFetcher<null> = (options, _, fetch) => {
  return fetch({
    ...defaultOpts,
    ...options,
  })
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
