import { useCallback } from 'react'
import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import Cookies from 'js-cookie'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    return null
  },
  useHook: ({ fetch }) => () => {

    return useCallback(
      async function logout() {
        Cookies.remove('CL_CUSTOMER_ID')
        Cookies.remove('CL_CUSTOMER_TOKEN')
        alert("Logout successful!")
      },
      [fetch]
    )
  },
}
