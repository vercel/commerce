import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useLogout, { UseLogout } from '@vercel/commerce/auth/use-logout'
import type { LogoutHook } from '@vercel/commerce/types/logout'
import useCustomer from '../customer/use-customer'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    url: '/api/logout',
    method: 'GET',
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCustomer()

      return useCallback(
        async function logout() {
          const data = await fetch()

          await mutate(null, false)

          return data
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fetch, mutate]
      )
    },
}
