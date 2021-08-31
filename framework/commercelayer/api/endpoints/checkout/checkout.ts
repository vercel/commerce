import type { CheckoutEndpoint } from '.'
import getCredentials from '@framework/api/utils/getCredentials'
import { Order } from '@commercelayer/js-sdk'

const checkout: CheckoutEndpoint['handlers']['checkout'] = async ({
  req,
  res,
}) => {
  let { orderId, accessToken } = req.query
  accessToken =
    typeof accessToken === 'string' ? accessToken.split('; CL_TOKEN=') : ''
  accessToken = accessToken[accessToken.length - 1]
  const { endpoint } = getCredentials()
  if (orderId && accessToken) {
    const clOrder = await Order.withCredentials({ endpoint, accessToken })
      .includes('lineItems')
      .find(orderId as string, { rawResponse: true })
    const checkoutUrl = clOrder.data.attributes.checkout_url
    console.log(checkoutUrl)

    if (checkoutUrl) {
      res.redirect(checkoutUrl)
    } else {
      res.redirect('/cart')
    }
  } else {
    res.redirect('/')
  }
}

export default checkout
