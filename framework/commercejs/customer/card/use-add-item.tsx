import type { AddItemHook } from '@commerce/types/customer/card'
import type { MutationHook } from '@commerce/utils/types'

import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@commerce/customer/card/use-add-item'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '_',
    method: '_',
  },
  useHook: () =>
    function useHook() {
      return useCallback(async function addItem() {
        return undefined
      }, [])
    },
}
