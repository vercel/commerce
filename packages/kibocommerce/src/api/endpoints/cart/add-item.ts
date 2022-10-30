import { normalizeCart } from '../../../lib/normalize'
import type { CartEndpoint } from '.'
import addToCurrentCartMutation from '../../../api/mutations/addToCart-mutation'

import { getProductQuery } from '../../../api/queries/get-product-query'
import { getCartQuery } from '../../../api/queries/get-cart-query'
import CookieHandler from '../../../api/utils/cookie-handler'

const buildAddToCartVariables = ({
  productId,
  variantId,
  quantity = 1,
  productResponse,
}: {
  productId: string
  variantId: string
  quantity: number
  productResponse: any
}) => {
  const { product } = productResponse.data

  const selectedOptions = product.variations?.find(
    (v: any) => v.productCode === variantId
  ).options

  let options: any[] = []
  selectedOptions?.forEach((each: any) => {
    product?.options
      .filter((option: any) => {
        return option.attributeFQN == each.attributeFQN
      })
      .forEach((po: any) => {
        options.push({
          attributeFQN: po.attributeFQN,
          name: po.attributeDetail.name,
          value: po.values?.find((v: any) => v.value == each.value).value,
        })
      })
  })

  return {
    productToAdd: {
      product: {
        productCode: productId,
        variationProductCode: variantId ? variantId : null,
        options,
      },
      quantity,
      fulfillmentMethod: 'Ship',
    },
  }
}

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  req,
  body: { item },
  config,
}) => {
  const productResponse = await config.fetch(getProductQuery, {
    variables: { productCode: item?.productId },
  })

  const cookieHandler = new CookieHandler(config, req)
  let accessToken = null

  if (!cookieHandler.getAccessToken()) {
    let anonymousShopperTokenResponse = await cookieHandler.getAnonymousToken()
    accessToken = anonymousShopperTokenResponse.accessToken
  } else {
    accessToken = cookieHandler.getAccessToken()
  }

  const addToCartResponse = await config.fetch(
    addToCurrentCartMutation,
    {
      variables: buildAddToCartVariables({ ...item, productResponse }),
    },
    { headers: { 'x-vol-user-claims': accessToken } }
  )
  let currentCart = null
  if (addToCartResponse.data.addItemToCurrentCart) {
    let result = await config.fetch(
      getCartQuery,
      {},
      { headers: { 'x-vol-user-claims': accessToken } }
    )
    currentCart = result?.data?.currentCart
  }

  return { data: normalizeCart(currentCart) }
}

export default addItem
