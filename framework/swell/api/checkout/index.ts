import createApiHandler, { SwellApiHandler } from '../utils/create-api-handler'

import { SWELL_CHECKOUT_URL_COOKIE } from '../../const'

import { getConfig } from '..'

const checkoutApi: SwellApiHandler<any> = async (req, res, config) => {
  config = getConfig()

  const { cookies } = req
  const checkoutUrl = cookies[SWELL_CHECKOUT_URL_COOKIE]

  if (checkoutUrl) {
    res.redirect(checkoutUrl)
  } else {
    res.redirect('/cart')
  }
}

export default createApiHandler(checkoutApi, {}, {})
