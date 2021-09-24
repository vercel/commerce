import type { GetAddressesHook } from '@commerce/types/customer/address'

import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useAddresses, {
  UseAddresses,
} from '@commerce/customer/address/use-addresses'

export default useAddresses as UseAddresses<typeof handler>

export const handler: SWRHook<GetAddressesHook> = {
  fetchOptions: {
    url: '/api/customer/address',
    method: 'GET',
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
