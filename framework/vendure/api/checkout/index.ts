import { NextApiHandler } from 'next'

const checkoutApi = async (req: any, res: any, config: any) => {
  try {
    const html = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Checkout</title>
        </head>
        <body>
          <div style='margin: 10rem auto; text-align: center; font-family: SansSerif, "Segoe UI", Helvetica'>
             <h1>Checkout not implemented :(</h1>
             <p>
             See <a href='https://github.com/vercel/commerce/issues/64' target='_blank'>#64</a>
             </p>
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

export function createApiHandler<T = any, H = {}, Options extends {} = {}>(
  handler: any,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: any
    operations?: Partial<H>
    options?: Options extends {} ? Partial<Options> : never
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }
    const opts = { ...defaultOptions, ...options }

    return function apiHandler(req, res) {
      return handler(req, res, config, ops, opts)
    }
  }
}

export default createApiHandler(checkoutApi, {}, {})
