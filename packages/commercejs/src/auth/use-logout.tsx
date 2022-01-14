import { useCallback } from 'react'
import Cookies from 'js-cookie'
import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import type { LogoutHook } from '@commerce/types/logout'
import useCustomer from '../customer/use-customer'
import { CUSTOMER_COOKIE } from '../constants'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    query: '_',
    method: '_',
  },
  useHook: () => () => {
    const { mutate } = useCustomer()
    return useCallback(
      async function logout() {
        Cookies.remove(CUSTOMER_COOKIE)
        await mutate(null, false)
        return null
      },
      [mutate]
    )
  },
}
