import type { CheckoutEndpoint } from '.'
import getCustomerId from '../../utils/get-customer-id'

const fullCheckout = true

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  config,
}) => {
  const { cookies } = req
  const cartId = cookies.get(config.cartCookie)?.value
  const customerToken = cookies.get(config.customerCookie)?.value

  if (!cartId) {
    return { redirectTo: '/cart' }
  }

  const { data } = await config.storeApiFetch<any>(
    `/v3/carts/${cartId}/redirect_urls`,
    {
      method: 'POST',
    }
  )

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))

  //if there is a customer create a jwt token
  if (!customerId) {
    if (fullCheckout) {
      return { redirectTo: data.checkout_url }
    }
  } else {
    // Dynamically import uuid & jsonwebtoken based on the runtime
    const { uuid } =
      process.env.NEXT_RUNTIME === 'edge'
        ? await import('@cfworker/uuid')
        : await import('uuidv4')

    const jwt =
      process.env.NEXT_RUNTIME === 'edge'
        ? await import('@tsndr/cloudflare-worker-jwt')
        : await import('jsonwebtoken')

    const dateCreated = Math.round(new Date().getTime() / 1000)
    const payload = {
      iss: config.storeApiClientId,
      iat: dateCreated,
      jti: uuid(),
      operation: 'customer_login',
      store_hash: config.storeHash,
      customer_id: customerId,
      channel_id: config.storeChannelId,
      redirect_to: data.checkout_url.replace(config.storeUrl, ''),
    }
    let token = jwt.sign(payload, config.storeApiClientSecret!, {
      algorithm: 'HS256',
    })
    let checkouturl = `${config.storeUrl}/login/token/${token}`

    if (fullCheckout) {
      return { redirectTo: checkouturl }
    }
  }

  // TODO: make the embedded checkout work too!
  // const html = `
  //      <!DOCTYPE html>
  //        <html lang="en">
  //        <head>
  //          <meta charset="UTF-8">
  //          <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //          <title>Checkout</title>
  //          <script src="https://checkout-sdk.bigcommerce.com/v1/loader.js"></script>
  //          <script>
  //            window.onload = function() {
  //              checkoutKitLoader.load('checkout-sdk').then(function (service) {
  //                service.embedCheckout({
  //                  containerId: 'checkout',
  //                  url: '${data.embedded_checkout_url}'
  //                });
  //              });
  //            }
  //          </script>
  //        </head>
  //        <body>
  //          <div id="checkout"></div>
  //        </body>
  //      </html>
  //    `

  // return new Response(html, {
  //   headers: {
  //     'Content-Type': 'text/html',
  //   },
  // })

  return { data: null }
}

export default getCheckout
