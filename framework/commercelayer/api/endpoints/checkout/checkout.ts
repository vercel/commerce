import type { CheckoutEndpoint } from '.'
import getCredentials from '@framework/api/utils/getCredentials'
import { Order } from '@commercelayer/js-sdk'

const checkout: CheckoutEndpoint['handlers']['checkout'] = async ({
  req,
  res,
}) => {
  let { orderId, accessToken } = req.query

    const name = 'CL_TOKEN' + "=";
    const cookiesArr = decodeURIComponent(accessToken = typeof accessToken === 'string' ? accessToken : '').split('; ');
    cookiesArr.forEach(val => {
      if (val.indexOf(name) === 0) accessToken = val.substring(name.length)
    })

  const { endpoint } = getCredentials()
  if (orderId && accessToken) {
    const clOrder = await Order.withCredentials({ endpoint, accessToken })
      .includes('lineItems')
      .find(orderId as string, { rawResponse: true })
    const checkoutUrl = clOrder.data.attributes.checkout_url

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
