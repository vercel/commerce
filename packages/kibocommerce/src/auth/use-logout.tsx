import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import type { LogoutHook } from '../types/logout'
import useCustomer from '../customer/use-customer'
import useCart from '../cart/use-cart'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    url: '/api/logout',
    method: 'GET',
  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCustomer()
    const { mutate: mutateCart } = useCart() 

    return useCallback(
      async function logout() {
        const data = await fetch()
        await mutate(null, false)
        await mutateCart(null, false)
        return data
      },
      [fetch, mutate, mutateCart]
    )
  },
}
