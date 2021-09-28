import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import Cookies from 'js-cookie'

export default useLogout as UseLogout<typeof handler>
import useCustomer from '../customer/use-customer'
import { useCallback } from 'react'

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '?',
  },
  async fetcher() {
    Cookies.remove("user_token");
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
