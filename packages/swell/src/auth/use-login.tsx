import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { CommerceError, ValidationError } from '@vercel/commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import {
  Mutation,
  MutationCheckoutCreateArgs,
} from '../../schema'
import useLogin, { UseLogin } from '@vercel/commerce/auth/use-login'
import { LoginHook } from '../types/login'
import { setCustomerToken } from '../utils'

export default useLogin as UseLogin<typeof handler>

const getErrorMessage = ( code?: string | null) => {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      return 'Cannot find an account that matches the provided credentials'
  }
  return undefined;
}

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    query: 'account',
    method: 'login',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to login',
      })
    }

    const response = await fetch<
      Mutation,
      MutationCheckoutCreateArgs
    >({
      ...options,
      variables: [email, password],
    })

    if (!response) {
      throw new ValidationError({
        message: getErrorMessage('UNIDENTIFIED_CUSTOMER')!
      })
    }

    const { customerAccessTokenCreate } = response;
    const errors = customerAccessTokenCreate?.customerUserErrors
    if (errors && errors.length) {
      throw new ValidationError({
        message: getErrorMessage(errors[0].code) ?? errors[0].message,
      })
    }
    const customerAccessToken = customerAccessTokenCreate?.customerAccessToken
    const accessToken = customerAccessToken?.accessToken

    if (accessToken) {
      setCustomerToken(accessToken)
    }

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()

      return useCallback(
        async function login(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch, mutate]
      )
    },
}
