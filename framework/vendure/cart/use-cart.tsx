import { HookFetcher } from '@commerce/utils/types'
import useData, { SwrOptions } from '@commerce/utils/use-data'
import useResponse from '@commerce/utils/use-response'
import { cartFragment } from '../api/fragments/cart'
import { CartFragment } from '../schema'
import { normalizeCart } from '@framework/lib/normalize'

export const getCartQuery = /* GraphQL */ `
  query activeOrder {
    activeOrder {
      ...Cart
    }
  }
  ${cartFragment}
`

export const fetcher: HookFetcher<any, null> = (options, input, fetch) => {
  return fetch({ ...options, query: getCartQuery })
}

export type CartResult = {
  activeOrder?: CartFragment
  addItemToOrder?: CartFragment
  adjustOrderLine?: CartFragment
  removeOrderLine?: CartFragment
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<any | null>
) {
  const useCart = () => {
    const response = useData<Cart>(
      { query: getCartQuery },
      [],
      customFetcher,
      swrOptions
    )
    const res = useResponse(response, {
      normalizer: (data) => {
        const order =
          data?.activeOrder ||
          data?.addItemToOrder ||
          data?.adjustOrderLine ||
          data?.removeOrderLine
        return order ? normalizeCart(order) : null
      },
      descriptors: {
        isEmpty: {
          get() {
            return response.data?.activeOrder?.totalQuantity === 0
          },
          enumerable: true,
        },
      },
    })

    return res
  }

  useCart.extend = extendHook

  return useCart
}

export default extendHook(fetcher)
