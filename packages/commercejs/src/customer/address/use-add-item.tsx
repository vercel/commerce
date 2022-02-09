import type { AddItemHook } from '@vercel/commerce/types/customer/address'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@vercel/commerce/customer/address/use-add-item'
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
