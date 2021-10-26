import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { MutationHook } from '@commerce/utils/types'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import { CommerceError } from '@commerce/utils/errors'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/signup',
    method: 'POST',
  },
  async fetcher({
    input: { firstName, lastName, email, password },
    options,
    fetch,
  }) {
    if (!(firstName && lastName && email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to signup',
      })
    }
    return await fetch({
      ...options,
      body: {
        payload: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
      },
    })
  },
  useHook: ({ fetch }) =>
    function useHook() {
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
