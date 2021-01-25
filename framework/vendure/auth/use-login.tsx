import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCommerceLogin from '@commerce/use-login'
import useCustomer from '../customer/use-customer'
import { LoginMutation, LoginMutationVariables } from '@framework/schema'

export const loginMutation = /* GraphQL */ `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      __typename
      ... on CurrentUser {
        id
      }
    }
  }
`

export const fetcher: HookFetcher<LoginMutation, LoginMutationVariables> = (
  options,
  { username, password },
  fetch
) => {
  if (!(username && password)) {
    throw new CommerceError({
      message: 'An email address and password are required to login',
    })
  }

  return fetch({
    ...options,
    query: loginMutation,
    variables: { username, password },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useLogin = () => {
    const { revalidate } = useCustomer()
    const fn = useCommerceLogin<LoginMutation, LoginMutationVariables>(
      {},
      customFetcher
    )

    return useCallback(
      async function login(input: { email: string; password: string }) {
        const data = await fn({
          username: input.email,
          password: input.password,
        })
        if (data.login.__typename !== 'CurrentUser') {
          throw new CommerceError({ message: 'The credentials are not valid' })
        }
        await revalidate()
        return data
      },
      [fn]
    )
  }

  useLogin.extend = extendHook

  return useLogin
}

export default extendHook(fetcher)
