import fetchGraphqlApi from '@framework/api/utils/fetch-graphql-api'
import { HookFetcher } from '@commerce/utils/types'
import useData, { SwrOptions } from '@commerce/utils/use-data'
import useCommerceCart, { CartInput } from '@commerce/cart/use-cart'
import useResponse from '@commerce/utils/use-response'
import useAction from '@commerce/utils/use-action'
import { useCallback } from 'react'
import { normalizeCart } from '../../bigcommerce/lib/normalize'

export const getCartQuery = /* GraphQL */ `
  query activeOrder {
    activeOrder {
      id
      code
      totalQuantity
      subTotal
      subTotalWithTax
      total
      totalWithTax
      currencyCode
      lines {
        id
        quantity
        featuredAsset {
          id
          preview
        }
        productVariant {
          name
          product {
            slug
          }
          productId
        }
      }
    }
  }
`

export const fetcher: HookFetcher<any | null> = (
  options,
  input,
  fetch
) => {
  return fetch({ ...options, query: getCartQuery })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<any | null>
) {
  const useCart = () => {
    const response = useData({}, [], customFetcher, swrOptions)
    const res = useResponse(response, {
      normalizer: (data => {
        const order = data?.activeOrder;
        console.log({ order });
        return (order ? {
          id: order.id,
          currency: { code: order.currencyCode },
          subTotal: order.subTotalWithTax / 100,
          total: order.totalWithTax / 100,
          items: order.lines?.map(l => ({
            name: l.productVariant.name,
            quantity: l.quantity,
            url: l.productVariant.product.slug,
            variantId: l.productVariant.id,
            productId: l.productVariant.productId,
            images: [{ url: l.featuredAsset?.preview }]
          }))
        } : null)
      }),
      descriptors: {
        isEmpty: {
          get() {
            return response.data?.activeOrder?.totalQuantity === 0
          },
          enumerable: true
        }
      }
    })

    return res
  }

  useCart.extend = extendHook

  return useCart
}

export default extendHook(fetcher)
