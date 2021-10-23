import type { GetAddressesHook } from '@commerce/types/customer/address'

import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useAddresses, {
  UseAddresses,
} from '@commerce/customer/address/use-addresses'

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
