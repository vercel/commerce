import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceCustomer from '@commerce/use-customer'
import getCustomerQuery from '@framework/utils/queries/get-customer-query'
import { getCustomerToken } from '@framework/utils/customer-token'

const defaultOpts = {
  query: getCustomerQuery,
}

export const fetcher: HookFetcher<any | null> = async (options, _, fetch) => {
  const customerAccessToken = getCustomerToken()
  if (customerAccessToken) {
    const data = await fetch<any | null>({
      ...defaultOpts,
      ...options,
      variables: { customerAccessToken },
    })
    return data?.customer ?? null
  }
  return null
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<any | null>
) {
  const useCustomer = () => {
    return useCommerceCustomer(defaultOpts, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    })
  }

  useCustomer.extend = extendHook

  return useCustomer
}

export default extendHook(fetcher)
