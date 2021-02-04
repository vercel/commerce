import { FetcherError } from '@commerce/utils/errors'
import type { LoginHandlers } from '../login'

const loginHandler: LoginHandlers['login'] = async ({
  res,
  body: { email, password },
  config,
}) => {
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
  } catch (error) {
    // Check if the email and password didn't match an existing account
    if (error instanceof FetcherError) {
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

export default loginHandler
