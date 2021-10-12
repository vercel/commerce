import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import { LogoutHook } from '@commerce/types/logout'
import useCustomer from '@commerce/customer/use-customer'
import { useCallback } from 'react'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    url: '/api/logout',
    method: 'GET',
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
