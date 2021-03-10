import { useCallback } from 'react'
import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import { LogoutMutation } from '../schema'

export const logoutMutation = /* GraphQL */ `
  mutation logout {
    logout {
      success
    }
  }
`

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<null> = {
  fetchOptions: {
    query: logoutMutation,
  },
  async fetcher({ options, fetch }) {
    await fetch<LogoutMutation>({
      ...options,
    })
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
