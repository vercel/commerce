import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import logoutMutation from '../utils/mutations/logout'
import { getCustomerToken, setCustomerToken } from '../utils/customer-token'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<null> = {
  fetchOptions: {
    query: logoutMutation,
  },
  async fetcher({ options, fetch }) {
    await fetch({
      ...options,
    })
    setCustomerToken(null)
    return null
  },
  useHook: ({ fetch }) => () => {
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
