import type { AddItemHook } from '@commerce/types/customer/address'
import type { MutationHook } from '@commerce/utils/types'

import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@commerce/customer/address/use-add-item'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: '_',
    method: '_',
  },
  useHook: () =>
    function useHook() {
      return useCallback(async function addItem() {
        return undefined
      }, [])
    },
}
