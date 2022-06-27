import type { WishlistEndpoint } from '.'
import {
  dedup,
  getActiveWishlist,
  normalizeWishlist,
  normalizeProduct,
  getCustomerId,
} from '../../../utils'
import {
  ClientResponse,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk'
import { setWishlistCookie } from '../../../utils'

// Return wishlist info
const getWishlist: WishlistEndpoint['handlers']['getWishlist'] = async ({
  req,
  res,
  body: { includeProducts },
  config,
}) => {
  const customerId = getCustomerId(req)
  const activeWishlist = await getActiveWishlist(req, res, config.sdkFetch)
  if (!activeWishlist || !customerId) {
    res.status(404).json({
      data: null,
      errors: [{ message: 'Wishlist not found' }],
    })
    return
  }
  setWishlistCookie(res, activeWishlist.id)
  const normalizedWishlist = normalizeWishlist(activeWishlist)
  if (!includeProducts || (activeWishlist.lineItems?.length ?? 0) === 0) {
    res.status(200).json({
      data: normalizedWishlist,
    })
    return
  }

  const products = (
    await config.sdkFetch<ClientResponse<ProductPagedQueryResponse>>({
      query: 'products',
      method: 'get',
      variables: {
        where: `id in (${dedup(
          activeWishlist.lineItems!.map((lineItem) => `"${lineItem.productId}"`)
        ).join(', ')})`,
      },
    })
  ).body?.results

  res.status(200).json({
    data: {
      items: normalizedWishlist.items.map((item) => ({
        ...item,
        product: normalizeProduct(
          {
            ...products?.find((product) => product.id === item.product_id)
              ?.masterData.current!,
            id: item.product_id,
          },
          config
        ),
      })),
    },
  })
}

export default getWishlist
