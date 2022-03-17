import useCheckout, {
  UseCheckout,
} from '@vercel/commerce/checkout/use-checkout'
import type { GetCheckoutHook } from '@vercel/commerce/types/checkout'
import { SWRHook } from '@vercel/commerce/utils/types'
import { useMemo } from 'react'
import { getCartQuery } from '../utils/queries/get-cart-query'
import useSubmitCheckout from './use-submit-checkout'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<GetCheckoutHook> = {
  fetchOptions: {
    query: getCartQuery,
  },
  async fetcher({ input, options, fetch }) {},
  useHook: ({ useData }) =>
    function useHook(input) {
      const submit = useSubmitCheckout()
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return true
              },
              enumerable: true,
            },
            submit: {
              get() {
                return submit
              },
              enumerable: true,
            },
          }),
        [response, submit]
      )
    },
}
