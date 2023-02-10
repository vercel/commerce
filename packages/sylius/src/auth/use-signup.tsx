import { useCallback } from 'react'
import { MutationHook } from '@vercel/commerce/utils/types'
import useSignup, { UseSignup } from '@vercel/commerce/auth/use-signup'
import { SignupHook } from '@vercel/commerce/types/signup'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<SignupHook> = {
  fetchOptions: {
    url: '/api/v2/shop/customers',
    method: 'POST',
  },
  fetcher: async ({
    input: { firstName, lastName, email, password },
    options,
    fetch,
  }) => {
    const data = await fetch({
      url: options.url,
      method: options.method,
      body: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        subscribedToNewsletter: false,
      },
      variables: {
        useToken: false,
      },
    })
    return data
  },
  useHook:
    ({ fetch }) =>
    () => {
      return useCallback(
        async function signup(input) {
          const data = await fetch({ input })
          return data
        },
        [fetch]
      )
    },
}
