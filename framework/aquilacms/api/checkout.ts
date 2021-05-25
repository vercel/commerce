import isAllowedMethod from './utils/is-allowed-method'
import createApiHandler, {
  AquilacmsApiHandler,
} from './utils/create-api-handler'
import { AquilacmsApiError } from './utils/errors'

const METHODS = ['GET']
const fullCheckout = false

// TODO: a complete implementation should have schema validation for `req.body`
const checkoutApi: AquilacmsApiHandler<any> = async (req, res, config) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const { cookies } = req
  const cartId = cookies[config.cartCookie]
  const token = cookies[config.customerCookie]

  try {
    if (!cartId) {
      res.redirect('/cart')
      return
    }

    if (!token)
      return res.status(401).json({
        data: null,
        errors: [{ message: 'You need to be logged in to continue' }],
      })

    if (fullCheckout) {
      const { data } = await config.storeApiFetch(
        `/v3/carts/${cartId}/redirect_urls`,
        {
          method: 'POST',
        }
      )
      res.redirect(data.checkout_url)
      return
    }

    // TODO: make the embedded checkout work too!
    const html = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Checkout</title>
          <script>
            window.onload = () => {
              window.location.href = "${process.env.AQUILACMS_URL}/cart/address?jwt=${token}&cartid=${cartId}"
            }
          </script>
        </head>
        <body>
        </body>
      </html>
    `

    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.write(html)
    res.end()
  } catch (error) {
    console.error(error)

    const message =
      error instanceof AquilacmsApiError
        ? 'An unexpected error ocurred with the Aquilacms API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export default createApiHandler(checkoutApi, {}, {})
