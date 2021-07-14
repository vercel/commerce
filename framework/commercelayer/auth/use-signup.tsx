import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import type { SignupHook } from '../types/signup'
import useCustomer from '../customer/use-customer'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<SignupHook> = {
  fetchOptions: {
    url: '/api/customers',
    method: 'POST',
  },
  async fetcher({
    input: { email, password },
    options,
    fetch,
  }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'An email address and password are required to signup',
      })
    }

    return fetch({
      ...options,
      body: { email, password },
    })
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