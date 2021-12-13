import type { SWRHook } from '@commerce/utils/types'
import useCustomer from '@commerce/customer/use-customer'
import type { UseCustomer } from '@commerce/customer/use-customer'
import type { CustomerHook } from '@commerce/types/customer'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { IAccount } from '@spree/storefront-api-v2-sdk/types/interfaces/Account'
import { FetcherError } from '@commerce/utils/errors'
import normalizeUser from '../utils/normalizations/normalize-user'
import isLoggedIn from '../utils/tokens/is-logged-in'
import ensureIToken from '../utils/tokens/ensure-itoken'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'account',
    query: 'get',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useCustomer fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    if (!isLoggedIn()) {
      return null
    }

    const token: IToken | undefined = ensureIToken()

    if (!token) {
      return null
    }

    try {
      const { data: spreeAccountInfoSuccessResponse } = await fetch<
        GraphQLFetcherResult<IAccount>
      >({
        variables: {
          methodPath: 'account.accountInfo',
          arguments: [token],
        },
      })

      const spreeUser = spreeAccountInfoSuccessResponse.data

      const normalizedUser = normalizeUser(
        spreeAccountInfoSuccessResponse,
        spreeUser
      )

      return normalizedUser
    } catch (fetchUserError) {
      if (
        !(fetchUserError instanceof FetcherError) ||
        fetchUserError.status !== 404
      ) {
        throw fetchUserError
      }

      return null
    }
  },
  useHook: ({ useData }) => {
    const useWrappedHook: ReturnType<SWRHook<CustomerHook>['useHook']> = (
      input
    ) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    }

    return useWrappedHook
  },
}
