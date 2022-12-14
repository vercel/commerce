import { MutationHook } from '@vercel/commerce/utils/types'
import useLogout, { UseLogout } from '@vercel/commerce/auth/use-logout'
import { useCustomer } from '../customer'
import { useCallback } from 'react'
import { setCustomerToken } from '../utils/token/customer-token'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '',
  },
  useHook: () => () => {
    const { mutate } = useCustomer()

    return useCallback(
      async function logout() {
        setCustomerToken(null)
        await mutate()
      },
      [mutate]
    )
  },
}
