import type { CheckoutEndpoint } from '.'
import getCredentials, { getOrganizationSlug } from '../../utils/getCredentials'
import CLSdk from '@commercelayer/sdk'

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
    const organization = getOrganizationSlug(ENDPOINT).organization
    const sdk = CLSdk({
      accessToken,
      organization,
    })
    const order = await sdk.orders.retrieve(orderId as string, {
      fields: ['checkout_url'],
    })
    const checkoutUrl = order?.checkout_url
      ? order?.checkout_url
      : `https://${organization}.checkout.commercelayer.app/${order?.id}`
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
