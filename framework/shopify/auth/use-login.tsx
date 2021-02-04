import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCommerceLogin from '@commerce/use-login'
import useCustomer from '../customer/use-customer'
import createCustomerAccessTokenMutation from '../utils/mutations/customer-acces-token-create'
import { CustomerAccessTokenCreateInput } from '@framework/schema'

const defaultOpts = {
  query: createCustomerAccessTokenMutation,
}

export const fetcher: HookFetcher<null, CustomerAccessTokenCreateInput> = (
  options,
  { email, password },
  fetch
) => {
  if (!(email && password)) {
    throw new CommerceError({
      message:
        'A first name, last name, email and password are required to login',
    })
  }

  return fetch({
    ...defaultOpts,
    ...options,
    body: { email, password },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useLogin = () => {
    const { revalidate } = useCustomer()
    const fn = useCommerceLogin<null, CustomerAccessTokenCreateInput>(
      defaultOpts,
      customFetcher
    )

    return useCallback(
      async function login(input: CustomerAccessTokenCreateInput) {
        const data = await fn(input)
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
