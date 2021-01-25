import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceCustomer from '@commerce/use-customer'
import { ActiveCustomerQuery } from '@framework/schema'
import useResponse from '@commerce/utils/use-response'

export const activeCustomerQuery = /* GraphQL */ `
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
    }
  }
`

export const fetcher: HookFetcher<ActiveCustomerQuery> = async (
  options,
  _,
  fetch
) => {
  return await fetch<ActiveCustomerQuery>({ query: activeCustomerQuery })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<ActiveCustomerQuery>
) {
  const useCustomer = () => {
    const response = useCommerceCustomer({}, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    })

    return useResponse(response, {
      normalizer: (data) => {
        return data?.activeCustomer
          ? {
              firstName: data?.activeCustomer?.firstName ?? '',
              lastName: data?.activeCustomer?.lastName ?? '',
              email: data?.activeCustomer?.emailAddress ?? '',
            }
          : null
      },
    })
  }

  useCustomer.extend = extendHook

  return useCustomer
}

export default extendHook(fetcher)
