import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import { getCustomerToken, setCustomerToken } from '../utils/customer-token'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<null> = {
  fetchOptions: {
    query: 'account',
    method: 'logout',
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
