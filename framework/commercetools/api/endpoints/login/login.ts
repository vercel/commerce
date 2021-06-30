import { FetcherError } from '@commerce/utils/errors'
import type { LoginEndpoint } from '.'

const invalidCredentials = /invalid credentials/i

const login: LoginEndpoint['handlers']['login'] = async ({
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
    await commerce.login({
      variables: { data: { email, password } },
      config,
      res,
    })
  } catch (error) {
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
