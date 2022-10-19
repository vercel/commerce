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
  } catch (error) {
    if (error instanceof BigcommerceApiError && error.status === 422) {
      const hasEmailError = '0.email' in error.data?.errors
      // If there's an error with the email, it most likely means it's duplicated
      if (hasEmailError) {
        throw new CommerceAPIError('Email already in use', {
          status: 400,
          code: 'duplicated_email',
        })
      }
    } else {
      throw error
    }
  }

  const res = new Response()

  // Login the customer right after creating it
  await commerce.login({ variables: { email, password }, res, config })

  return {
    headers: res.headers,
  }
}

export default signup
