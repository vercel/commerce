import { useCallback } from 'react'
import type { HookFetcher } from '@commerce/utils/types'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import useCommerceLogin from '@commerce/use-login'
import useCustomer from '../customer/use-customer'
import createCustomerAccessTokenMutation from '../utils/mutations/customer-access-token-create'
import { CustomerAccessTokenCreateInput } from '@framework/schema'
import { setCustomerToken } from '@framework/utils/customer-token'

const defaultOpts = {
  query: createCustomerAccessTokenMutation,
}

const getErrorMessage = ({
  code,
  message,
}: {
  code: string
  message: string
}) => {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      message = 'Cannot find an account that matches the provided credentials'
      break
  }
  return message
}

export const fetcher: HookFetcher<null, CustomerAccessTokenCreateInput> = (
  options,
  input,
  fetch
) => {
  if (!(input.email && input.password)) {
    throw new CommerceError({
      message:
        'A first name, last name, email and password are required to login',
    })
  }

  return fetch({
    ...defaultOpts,
    ...options,
    variables: { input },
  }).then((data) => {
    const response = data?.customerAccessTokenCreate
    const errors = response?.customerUserErrors

    if (errors && errors.length) {
      throw new ValidationError({
        message: getErrorMessage(errors[0]),
      })
    }

    const customerAccessToken = response?.customerAccessToken
    const accessToken = customerAccessToken?.accessToken

    if (accessToken) {
      setCustomerToken(accessToken)
    }

    return customerAccessToken
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
