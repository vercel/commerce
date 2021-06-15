import { NextApiHandler } from 'next'
import { CommerceAPI, createEndpoint, GetAPISchema } from '@commerce/api'
import { CheckoutSchema } from '@commerce/types/checkout'
import checkoutEndpoint from '@commerce/api/endpoints/checkout'

const checkout: CheckoutEndpoint['handlers']['checkout'] = async ({ req, res, config }) => {
  try {
    const html = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Saleor Checkout</title>
          <style>
            .container {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              font-family: SansSerif, "Segoe UI", Helvetica;
              font-size: 1.25rem;
              text-align: center;
            }

            p {
              color: white;
              font-size: 24px;
            }

            a {
              color: #EEE
            }

            body,
html {
  background-color: #3B6EF6;
  height: 100%;
}
          </style>
        </head>
        <body>
          <div class="container">
            <div>
              <img src="/saleor-checkout-404.png" width="500"/>
              <p>
                Check <a href='https://github.com/vercel/commerce/issues/64' target='_blank'>vercel/commerce#64</a> for details
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.write(html)
    res.end()
  } catch (error) {
    console.error(error)

    const message = 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export type CheckoutAPI = GetAPISchema<CommerceAPI, CheckoutSchema>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

export const handlers: CheckoutEndpoint['handlers'] = { checkout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi
