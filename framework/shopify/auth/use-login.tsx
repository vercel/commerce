import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import type { LoginHook } from '../types/login'
import useCustomer from '../customer/use-customer'

import createCustomerAccessTokenMutation from '../utils/mutations/customer-access-token-create'
import { setCustomerToken, throwUserErrors } from '@framework/utils'
import {
  Mutation,
  MutationCustomerAccessTokenCreateArgs,
} from '@framework/schema'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
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
      MutationCustomerAccessTokenCreateArgs
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
