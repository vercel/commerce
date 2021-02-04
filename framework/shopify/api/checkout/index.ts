import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  ShopifyApiHandler,
} from '../utils/create-api-handler'

import { SHOPIFY_CHECKOUT_URL_COOKIE } from '@framework/const'

const METHODS = ['GET']

const checkoutApi: ShopifyApiHandler<any> = async (req, res) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const { cookies } = req
  const checkoutUrl = cookies[SHOPIFY_CHECKOUT_URL_COOKIE]

  if (checkoutUrl) {
    res.redirect(checkoutUrl)
  } else {
    res.redirect('/cart')
  }
}

export default createApiHandler(checkoutApi, {}, {})
