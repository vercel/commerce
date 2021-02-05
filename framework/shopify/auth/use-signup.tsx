import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCommerceSignup from '@commerce/use-signup'
import useCustomer from '../customer/use-customer'
import { CustomerCreateInput } from '@framework/schema'

import {
  customerCreateMutation,
  customerAccessTokenCreateMutation,
} from '@framework/utils/mutations'
import handleLogin from '@framework/utils/handle-login'

const defaultOpts = {
  query: customerCreateMutation,
}

export const fetcher: HookFetcher<null, CustomerCreateInput> = (
  options,
  input,
  fetch
) => {
  if (!(input.firstName && input.lastName && input.email && input.password)) {
    throw new CommerceError({
      message:
        'A first name, last name, email and password are required to signup',
    })
  }
  return fetch({
    ...defaultOpts,
    ...options,
    variables: { input },
  }).then(async (data) => {
    try {
      const loginData = await fetch({
        query: customerAccessTokenCreateMutation,
        variables: {
          input: {
            email: input.email,
            password: input.password,
          },
        },
      })
      handleLogin(loginData)
    } catch (error) {}
    return data
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useSignup = () => {
    const { revalidate } = useCustomer()
    const fn = useCommerceSignup<null, CustomerCreateInput>(
      defaultOpts,
      customFetcher
    )

    return useCallback(
      async function signup(input: CustomerCreateInput) {
        const data = await fn(input)
        await revalidate()
        return data
      },
      [fn]
    )
  }

  useSignup.extend = extendHook

  return useSignup
}

export default extendHook(fetcher)
