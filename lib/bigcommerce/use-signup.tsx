import { useCallback } from 'react'
import { HookFetcher } from '@lib/commerce/utils/types'
import useCommerceSignup from '@lib/commerce/use-signup'
import type { SignupBody } from './api/customers/signup'

const defaultOpts = {
  url: '/api/bigcommerce/customers/signup',
  method: 'POST',
}

export type SignupInput = SignupBody

export const fetcher: HookFetcher<null, SignupBody> = (
  options,
  { firstName, lastName, email, password },
  fetch
) => {
  if (!(firstName && lastName && email && password)) {
    throw new Error(
      'A first name, last name, email and password are required to signup'
    )
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { firstName, lastName, email, password },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useSignup = () => {
    const fn = useCommerceSignup<null, SignupInput>(defaultOpts, customFetcher)

    return useCallback(
      async function signup(input: SignupInput) {
        const data = await fn(input)
        return data
      },
      [fn]
    )
  }

  useSignup.extend = extendHook

  return useSignup
}

export default extendHook(fetcher)
