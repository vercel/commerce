import type { SignupEndpoint } from '.'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import { BigcommerceApiError } from '../../utils/errors'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  body: { firstName, lastName, email, password },
  config,
  commerce,
}) => {
  try {
    await config.storeApiFetch('/v3/customers', {
      method: 'POST',
      body: JSON.stringify([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          authentication: {
            new_password: password,
          },
        },
      ]),
    })

    // Login the customer right after creating it
    const response = await commerce.login({
      variables: { email, password },
      config,
    })

    return response
  } catch (error) {
    // Display all validation errors from BigCommerce in a single error message
    if (error instanceof BigcommerceApiError && error.status >= 400) {
      const message = Object.values(error.data.errors).join('<br />')
      if (message) {
        throw new CommerceAPIError(message, {
          status: 400,
          code: 'invalid_request',
        })
      }
    }

    throw error
  }
}

export default signup
