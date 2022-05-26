import type { GetAddressesHook } from '@vercel/commerce/types/customer/address'

import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useAddresses, {
  UseAddresses,
} from '@vercel/commerce/customer/address/use-addresses'
import { activeCustomerQuery } from '../../utils/queries/active-customer-query'

export default useAddresses as UseAddresses<typeof handler>

export const handler: SWRHook<GetAddressesHook> = {
  fetchOptions: {
    query: activeCustomerQuery,
  },
  useHook: ({ useData }) =>
    function useHook(input) {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
