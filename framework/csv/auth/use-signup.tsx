import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import useCustomer from '../customer/use-customer'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<null, {}, any, any> = {
  fetchOptions: {
    query: ``,
  },
  async fetcher() {
    return null
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function signup(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
