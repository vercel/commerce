import { useCallback } from 'react'
import { MutationHook } from '@commerce/utils/types'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import useCustomer from '../customer/use-customer'
import {
  RegisterCustomerInput,
  SignupMutation,
  SignupMutationVariables,
} from '../schema'

export const signupMutation = /* GraphQL */ `
  mutation signup($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<
  null,
  {},
  RegisterCustomerInput,
  RegisterCustomerInput
> = {
  fetchOptions: {
    query: signupMutation,
  },
  async fetcher({
    input: { firstName, lastName, emailAddress, password },
    options,
    fetch,
  }) {
    if (!(firstName && lastName && emailAddress && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to signup',
      })
    }
    const variables: SignupMutationVariables = {
      input: {
        firstName,
        lastName,
        emailAddress,
        password,
      },
    }
    const { registerCustomerAccount } = await fetch<SignupMutation>({
      ...options,
      variables,
    })

    if (registerCustomerAccount.__typename !== 'Success') {
      throw new ValidationError(registerCustomerAccount)
    }

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
