import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import { setCustomerToken } from '@framework/utils'
import { createUserMutation } from '@framework/utils/mutations'
import useCustomer from '../customer/use-customer'
import { CreateUserInput } from '../schema'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<
  null,
  {},
  CreateUserInput,
  CreateUserInput
> = {
  fetchOptions: {
    query: createUserMutation,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to sign up',
      })
    }
    const { createUser } = await fetch({
      ...options,
      variables: {
        input: {
          email,
          password,
        },
      },
    })

    const accessToken = createUser?.loginResult?.tokens?.accessToken

    if (accessToken) {
      setCustomerToken(accessToken)
    }

    return createUser
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
