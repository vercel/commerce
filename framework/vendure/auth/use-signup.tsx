import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCommerceSignup from '@commerce/use-signup'
import useCustomer from '../customer/use-customer'
import {
  ErrorResult,
  SignupMutation,
  SignupMutationVariables,
} from '@framework/schema'

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

export type SignupInput = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export const fetcher: HookFetcher<SignupMutation, SignupMutationVariables> = (
  options,
  { input },
  fetch
) => {
  const { firstName, lastName, emailAddress, password } = input
  if (!(firstName && lastName && emailAddress && password)) {
    throw new CommerceError({
      message:
        'A first name, last name, email and password are required to signup',
    })
  }

  return fetch({
    ...options,
    query: signupMutation,
    variables: { input },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useSignup = () => {
    const { revalidate } = useCustomer()
    const fn = useCommerceSignup<SignupMutation, SignupMutationVariables>(
      {},
      customFetcher
    )

    return useCallback(
      async function signup(input: SignupInput) {
        const { registerCustomerAccount } = await fn({
          input: {
            firstName: input.firstName,
            lastName: input.lastName,
            emailAddress: input.email,
            password: input.password,
          },
        })
        if (registerCustomerAccount.__typename !== 'Success') {
          throw new CommerceError({
            message: (registerCustomerAccount as ErrorResult).message,
          })
        }
        await revalidate()
        return { registerCustomerAccount }
      },
      [fn]
    )
  }

  useSignup.extend = extendHook

  return useSignup
}

export default extendHook(fetcher)
