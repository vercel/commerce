import type { LoginEndpoint } from '.'

import { FetcherError } from '@vercel/commerce/utils/errors'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

const invalidCredentials = /invalid credentials/i

const login: LoginEndpoint['handlers']['login'] = async ({
  body: { email, password },
  config,
  commerce,
}) => {
  try {
    const response = await commerce.login({
      variables: { email, password },
      config,
    })

    return response
  } catch (error) {
    // Check if the email and password didn't match an existing account
    if (error instanceof FetcherError) {
      throw new CommerceAPIError(
        invalidCredentials.test(error.message)
          ? 'Cannot find an account that matches the provided credentials'
          : error.message,
        { status: 401 }
      )
    } else {
      throw error
    }
  }
}

export default login
