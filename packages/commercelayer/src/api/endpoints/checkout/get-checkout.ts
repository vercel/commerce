import type { CheckoutEndpoint } from '.'
import { Orders } from '@commercelayer/sdk'
import getCredentials from '../../utils/getCredentials'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  res,
}) => {
  let { orderId, accessToken } = req.query

  const name = 'CL_TOKEN' + '='
  const cookiesArr = decodeURIComponent(
    (accessToken = typeof accessToken === 'string' ? accessToken : '')
  ).split('; ')
  cookiesArr.forEach((val) => {
    if (val.indexOf(name) === 0) accessToken = val.substring(name.length)
  })

  const { ENDPOINT } = getCredentials()
  if (orderId && accessToken) {
    const clOrder = await Orders.withCredentials({ ENDPOINT, accessToken })
      .includes('lineItems')
      .find(orderId as string, { rawResponse: true })
    const checkoutUrl = clOrder.data.attributes.checkout_url

    if (checkoutUrl) {
      res.redirect(`${checkoutUrl}?accessToken=${accessToken}`)
    } else {
      res.redirect('/cart')
    }
  } else {
    res.redirect('/')
  }
}

export default getCheckout
