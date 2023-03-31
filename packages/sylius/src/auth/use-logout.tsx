import { MutationHook } from '@vercel/commerce/utils/types'
import useLogout, { UseLogout } from '@vercel/commerce/auth/use-logout'
import { useCustomer } from '../customer'
import { useCallback } from 'react'
import { setCustomerToken } from '../utils/token/customer-token'
import { LogoutHook } from '@vercel/commerce/types/logout'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    url: '',
  },
  useHook: () => () => {
    const { mutate } = useCustomer()

    return useCallback(
      async function logout() {
        setCustomerToken(null)
        await mutate()
        return null
      },
      [mutate]
    )
  },
}
