import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { CommerceError } from '@vercel/commerce/utils/errors'
import useSignup, { UseSignup } from '@vercel/commerce/auth/use-signup'
import useCustomer from '../customer/use-customer'
import { AccountRegisterInput, Mutation, MutationAccountRegisterArgs } from '../../schema'

import * as mutation from '../utils/mutations'
import { handleAutomaticLogin, throwUserErrors } from '../utils'
import { SignupHook } from '@vercel/commerce/types/signup'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<SignupHook> = {
  fetchOptions: {
    query: mutation.AccountCreate,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'A first name, last name, email and password are required to signup',
      })
    }

    const { customerCreate } = await fetch<Mutation, MutationAccountRegisterArgs>({
      ...options,
      variables: {
        input: {
          email,
          password,
          redirectUrl: 'https://localhost.com',
          channel: 'default-channel',
        },
      },
    })

    throwUserErrors(customerCreate?.errors)
    await handleAutomaticLogin(fetch, { email, password })

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function signup(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch, mutate]
      )
    },
}
