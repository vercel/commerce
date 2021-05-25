import { FetcherError } from '@commerce/utils/errors'
import login from '../../../auth/login'
import type { LoginHandlers } from '../login'

const invalidCredentials = /invalid credentials/i

const loginHandler: LoginHandlers['login'] = async ({
  res,
  body: { email, password },
  config,
}) => {
  // TODO: Add proper validations with something like Ajv
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  // TODO: validate the password and email
  // Passwords must be at least 7 characters and contain both alphabetic
  // and numeric characters.

  try {
    await login({ variables: { email, password }, config, res })
  } catch (error) {
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

export default loginHandler
