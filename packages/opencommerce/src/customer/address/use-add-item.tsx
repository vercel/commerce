import type { AddItemHook } from '@vercel/commerce/types/customer/address'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useAddItem, {
  UseAddItem,
} from '@vercel/commerce/customer/address/use-add-item'
import { useCheckoutContext } from '@components/checkout/context'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/commerce/customer/address',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    const data = await fetch({
      ...options,
      body: { item },
    })

    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { setAddressFields, addressFields } = useCheckoutContext()
      return useCallback(
        async function addItem(input) {
          await fetch({ input })
          setAddressFields({ ...addressFields, ...input })
          return null
        },
        [setAddressFields]
      )
    },
}
