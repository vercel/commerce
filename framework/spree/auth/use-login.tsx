import type { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import type { LoginHook } from '@commerce/types/login'
import { useCallback } from 'react'
import type { AuthTokenAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Authentication'
import useCustomer from '../customer/use-customer'
import { FetcherError, ValidationError } from '@commerce/utils/errors'
import login from '../utils/login'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'authentication',
    query: 'getToken',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useLogin fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const { email, password } = input

    if (!email || !password) {
      throw new ValidationError({
        message: 'Email and password need to be provided.',
      })
    }

    const getTokenParameters: AuthTokenAttr = {
      username: email,
      password,
    }

    try {
      await login(fetch, getTokenParameters)

      return null
    } catch (getTokenError) {
      if (
        getTokenError instanceof FetcherError &&
        getTokenError.status === 400
      ) {
        // Change the error message to be more user friendly.
        throw new FetcherError({
          status: getTokenError.status,
          message: 'The email or password is invalid.',
          code: getTokenError.code,
        })
      }

      throw getTokenError
    }

    // TODO: Add token refresh after access token expiration.
  },
  useHook: ({ fetch }) => {
    const useWrappedHook: ReturnType<MutationHook<LoginHook>['useHook']> =
      () => {
        console.log('useLogin useHook called.')

        const { revalidate } = useCustomer()

        return useCallback(
          async function login(input) {
            const data = await fetch({ input })

            await revalidate()

            return data
          },
          [revalidate]
        )
      }

    return useWrappedHook
  },
}
