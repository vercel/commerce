import { Product } from './../../../schema.d'
import { normalizeCart } from '../../../lib/normalize'
import type { CartEndpoint } from '.'
import addToCurrentCartMutation from '@framework/api/mutations/addToCart-mutation'
import getAnonymousShopperToken from '@framework/api/utils/get-anonymous-shopper-token'
import { getCookieExpirationDate } from '@framework/lib/getCookieExpirationDate'
import { prepareSetCookie } from '@framework/lib/prepareSetCookie'
import { setCookies } from '@framework/lib/setCookie'
import { getProductQuery } from '@framework/api/queries/get-product-query'
import { getCartQuery } from '@framework/api/queries/getCartQuery'
import CookieHandler from '@framework/api/utils/cookie-handler'

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
  res,
  body: { cartId, item },
  config,
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }
  if (!item.quantity) item.quantity = 1

  const productResponse = await config.fetch(getProductQuery, {
    variables: { productCode: item?.productId },
  })

  const cookieHandler = new CookieHandler(config, req, res)
  let accessToken = null

  if (!cookieHandler.getAccessToken()) {
    let anonymousShopperTokenResponse = await cookieHandler.getAnonymousToken()
    accessToken = anonymousShopperTokenResponse.accessToken;
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
  res.status(200).json({ data: normalizeCart(currentCart) })
}

export default addItem
