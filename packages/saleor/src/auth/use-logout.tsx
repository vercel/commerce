import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useLogout, { UseLogout } from '@vercel/commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import * as mutation from '../utils/mutations'
import { setCSRFToken, setToken, setCheckoutToken } from '../utils/customer-token'
import { LogoutHook } from '@vercel/commerce/types/logout'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    query: mutation.SessionDestroy,
  },
  async fetcher({ options, fetch }) {
    await fetch({
      ...options,
      variables: {},
    })

    setToken()
    setCSRFToken()
    setCheckoutToken()

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function logout() {
          const data = await fetch()
          await mutate(null, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
