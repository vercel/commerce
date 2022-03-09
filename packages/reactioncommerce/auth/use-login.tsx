import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import authenticateMutation from '../utils/mutations/authenticate'
import {
  CustomerAccessTokenCreateInput,
  CustomerUserError,
  Mutation,
  MutationAuthenticateArgs,
} from '../schema'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { setCustomerToken } from '../utils'

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
    query: authenticateMutation,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to login',
      })
    }

    console.log('querying API')

    const { authenticate } = await fetch<Mutation, MutationAuthenticateArgs>({
      ...options,
      variables: {
        serviceName: 'password',
        params: { user: { email }, password },
      },
    })

    const accessToken = authenticate?.tokens?.accessToken

    console.log('accessToken', accessToken)

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
