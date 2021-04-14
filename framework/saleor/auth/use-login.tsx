import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import createCustomerAccessTokenMutation from '../utils/mutations/customer-access-token-create'
import {
  CustomerAccessTokenCreateInput,
  CustomerUserError,
  Mutation,
  MutationCheckoutCreateArgs,
} from '../schema'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { setCustomerToken, throwUserErrors } from '../utils'

export default useLogin as UseLogin<typeof handler>

const getErrorMessage = ({ code, message }: CustomerUserError) => {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      message = 'Cannot find an account that matches the provided credentials'
      break
  }
  return message
}

export const handler: MutationHook<null, {}, CustomerAccessTokenCreateInput> = {
  fetchOptions: {
    query: createCustomerAccessTokenMutation,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to login',
      })
    }

    const { customerAccessTokenCreate } = await fetch<
      Mutation,
      MutationCheckoutCreateArgs
    >({
      ...options,
      variables: {
        input: { email, password },
      },
    })

    throwUserErrors(customerAccessTokenCreate?.customerUserErrors)

    const customerAccessToken = customerAccessTokenCreate?.customerAccessToken
    const accessToken = customerAccessToken?.accessToken

    if (accessToken) {
      setCustomerToken(accessToken)
    }

    return null
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function login(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
