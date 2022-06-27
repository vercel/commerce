import { FetcherError } from '@vercel/commerce/utils/errors'
import { getActiveCart, removeCustomerCookie } from '../../../utils'
import type { LoginEndpoint } from '.'

const invalidCredentials = /credentials not found/i

const login: LoginEndpoint['handlers']['login'] = async ({
  req,
  res,
  body: { email, password },
  config,
  commerce,
}) => {
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  try {
    const activeCart = await getActiveCart(req, res, config.sdkFetch)
    await commerce.login({
      variables: {
        email,
        password,
        cartId:
          activeCart && !activeCart.customerId ? activeCart.id : undefined,
      },
      config,
      res,
    })
  } catch (error) {
    removeCustomerCookie(res)
    // Check if the email and password didn't match an existing account
    if (
      error instanceof FetcherError &&
      invalidCredentials.test(error.message)
    ) {
      return res.status(401).json({
        data: null,
        errors: [
          {
            message:
              'Cannot find an account that matches the provided credentials',
            code: 'invalid_credentials',
          },
        ],
      })
    }
    throw error
  }
  res.status(200).json({ data: null })
}

export default login
