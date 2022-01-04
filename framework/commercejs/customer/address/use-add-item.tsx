import type { AddItemHook } from '@commerce/types/customer/address'
import type { MutationHook } from '@commerce/utils/types'
import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@commerce/customer/address/use-add-item'
import { useCheckoutContext } from '@components/checkout/context'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: '_',
    method: '_',
  },
  useHook: () =>
    function useHook() {
      const { setAddressFields } = useCheckoutContext()
      return useCallback(
        async function addItem(input) {
          setAddressFields(input)
          return undefined
        },
        [setAddressFields]
      )
    },
}
