import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useCustomer from '../customer/use-customer'
import useLogin, { UseLogin } from '@commerce/auth/use-login'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<null, {}, any> = {
  fetchOptions: {
    query: ``,
  },
  async fetcher() {
    return null
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function login(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
