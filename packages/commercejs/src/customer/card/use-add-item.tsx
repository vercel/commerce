import type { AddItemHook } from '@vercel/commerce/types/customer/card'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@vercel/commerce/customer/card/use-add-item'
import { useCheckoutContext } from '@components/checkout/context'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '_',
    method: '_',
  },
  useHook: () =>
    function useHook() {
      const { setCardFields } = useCheckoutContext()
      return useCallback(
        async function addItem(input) {
          setCardFields(input)
          return undefined
        },
        [setCardFields]
      )
    },
}
