import type { AddItemHook } from '@commerce/types/customer/address'
import type { MutationHook } from '@commerce/utils/types'

import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@commerce/customer/address/use-add-item'
import useAddresses from './use-addresses'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/customer/address',
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
      const { mutate } = useAddresses()

      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })

          await mutate([data], false)

          return data
        },
        [fetch, mutate]
      )
    },
}
