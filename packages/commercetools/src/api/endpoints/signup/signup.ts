import { getActiveCart, setCustomerId } from '../../../utils'
import type { SignupEndpoint } from '.'
import {
  CustomerDraft,
  CustomerSignInResult,
  ClientResponse,
} from '@commercetools/platform-sdk'
import { FetcherError } from '@vercel/commerce/utils/errors'

const existingCustomer = /existing customer/i

const signup: SignupEndpoint['handlers']['signup'] = async ({
  req,
  res,
  body: { firstName, lastName, email, password },
  config,
}) => {
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  try {
    const activeCart = await getActiveCart(req, res, config.sdkFetch)
    const response = await config.sdkFetch<
      ClientResponse<CustomerSignInResult>,
      CustomerDraft
    >({
      query: 'customers',
      method: 'post',
      body: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        ...(activeCart && !activeCart.customerId
          ? {
              anonymousCart: {
                typeId: 'cart',
                id: activeCart.id,
              },
            }
          : {}),
      },
    })
    setCustomerId(res, response.body.customer.id)
  } catch (error) {
    if (error instanceof FetcherError && existingCustomer.test(error.message)) {
      return res.status(400).json({
        data: null,
        errors: [
          {
            message: 'The email is already in use',
            code: 'duplicated_email',
          },
        ],
      })
    }
    throw error
  }
  res.status(200).json({ data: null })
}

export default signup
