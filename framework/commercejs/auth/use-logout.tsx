import { useCallback } from 'react'
import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import type { LogoutHook } from '@commerce/types/logout'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    query: 'customer',
    method: 'logout',
  },
  async fetcher({ options: { query, method }, fetch }) {
    await fetch({
      query,
      method,
    })
    return null
  },
  useHook: ({ fetch }) =>
    function useHook() {
      return useCallback(async function logout() {
        return fetch()
      }, [])
    },
}
