import { useMemo } from 'react'
import type { SWRHook } from '@commerce/utils/types'
import useCart from '@commerce/cart/use-cart'
import type { UseCart } from '@commerce/cart/use-cart'
import type { GetCartHook } from '@commerce/types/cart'
import normalizeCart from '../utils/normalize-cart'
import type { GraphQLFetcherResult } from '@commerce/api'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import setCartToken from '../utils/set-cart-token'
import { FetcherError } from '@commerce/utils/errors'

export default useCart as UseCart<typeof handler>

// This handler avoids calling /api/cart.
// There doesn't seem to be a good reason to call it.
// So far, only @framework/bigcommerce uses it.
export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    url: '__UNUSED__',
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useCart fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const { cartId: cartToken } = input
    let spreeCartResponse: IOrder | null

    if (!cartToken) {
      spreeCartResponse = null
    } else {
      const spreeToken: IToken = { orderToken: cartToken }

      try {
        const { data: spreeCartShowSuccessResponse } = await fetch<
          GraphQLFetcherResult<IOrder>
        >({
          variables: {
            methodPath: 'cart.show',
            arguments: [
              spreeToken,
              {
                include: [
                  'line_items',
                  'line_items.variant',
                  'line_items.variant.product',
                  'line_items.variant.product.images',
                  'line_items.variant.images',
                  'line_items.variant.option_values',
                  'line_items.variant.product.option_types',
                ].join(','),
              },
            ],
          },
        })

        spreeCartResponse = spreeCartShowSuccessResponse
      } catch (fetchCartError) {
        if (
          !(fetchCartError instanceof FetcherError) ||
          fetchCartError.status !== 404
        ) {
          throw fetchCartError
        }

        spreeCartResponse = null
      }
    }

    if (!spreeCartResponse || spreeCartResponse?.data.attributes.completed_at) {
      const { data: spreeCartCreateSuccessResponse } = await fetch<
        GraphQLFetcherResult<IOrder>
      >({
        variables: {
          methodPath: 'cart.create',
          arguments: [],
        },
      })

      spreeCartResponse = spreeCartCreateSuccessResponse
    }

    setCartToken(spreeCartResponse.data.attributes.token)

    return normalizeCart(spreeCartResponse, spreeCartResponse.data)
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      console.log('useCart useHook called.')

      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input.swrOptions },
      })

      return useMemo<typeof response & { isEmpty: boolean }>(() => {
        return Object.create(response, {
          isEmpty: {
            get() {
              return (response.data?.lineItems.length ?? 0) === 0
            },
            enumerable: true,
          },
        })
      }, [response])
    },
}
