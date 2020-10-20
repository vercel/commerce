import { useCallback } from 'react'
import { HookFetcher } from '@lib/commerce/utils/types'
import useCommerceSignup from '@lib/commerce/use-signup'
import type { CreateCustomerBody } from './api/customers'

const defaultOpts = {
  url: '/api/bigcommerce/customers',
  method: 'POST',
}

export type SignupInput = CreateCustomerBody

export const fetcher: HookFetcher<undefined, CreateCustomerBody> = (
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
    url: options?.url ?? defaultOpts.url,
    method: options?.method ?? defaultOpts.method,
    body: { firstName, lastName, email, password },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useSignup = () => {
    const fn = useCommerceSignup<undefined, SignupInput>(
      defaultOpts,
      customFetcher
    )

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
