import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import type { LogoutHook } from '../types/logout'
import useCustomer from '../customer/use-customer'
import customerAccessTokenDeleteMutation from '../utils/mutations/customer-access-token-delete'
import { getCustomerToken, setCustomerToken } from '../utils/customer-token'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    query: customerAccessTokenDeleteMutation,
  },
  async fetcher({ options, fetch }) {
    await fetch({
      ...options,
      variables: {
        customerAccessToken: getCustomerToken(),
      },
    })
    setCustomerToken(null)
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
