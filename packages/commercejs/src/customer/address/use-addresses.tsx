import type { GetAddressesHook } from '@vercel/commerce/types/customer/address'

import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useAddresses, {
  UseAddresses,
} from '@vercel/commerce/customer/address/use-addresses'

export default useAddresses as UseAddresses<typeof handler>

export const handler: SWRHook<GetAddressesHook> = {
  fetchOptions: {
    url: '_',
    method: '_',
  },
  useHook: () =>
    function useHook() {
      return useMemo(
        () =>
          Object.create(
            {},
            {
              isEmpty: {
                get() {
                  return true
                },
                enumerable: true,
              },
            }
          ),
        []
      )
    },
}
