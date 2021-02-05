import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCommerceSignup from '@commerce/use-signup'
import useCustomer from '../customer/use-customer'
import customerCreateMutation from '@framework/utils/mutations/customer-create'
import { CustomerCreateInput } from '@framework/schema'

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
  }).then((data) => {
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
