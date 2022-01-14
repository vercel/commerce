import type { GetCardsHook } from '@vercel/commerce/types/customer/card'
import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCard, { UseCards } from '@vercel/commerce/customer/card/use-cards'

export default useCard as UseCards<typeof handler>

export const handler: SWRHook<GetCardsHook> = {
  fetchOptions: {
    query: '_',
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
