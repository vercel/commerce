import { FetcherError } from '@commerce/utils/errors'
import { passwordLogin } from '@framework/api/utils/fetch-rest'
import { provider } from 'framework/local/api'
import type { LoginEndpoint } from '.'

const invalidCredentials = /invalid credentials/i

const login: LoginEndpoint['handlers']['login'] = async ({
  req,  
  res,
  body: { email, password },
  config: { commerceUrl },
}) => {
  console.log(email, password)
  // TODO: Add proper validations with something like Ajv
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Get token from cookies
  let response: any;

  try {
    response = await passwordLogin(email, password, commerceUrl);
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

  console.log(response)

  // set buyer token
  global.token = response.access_token;

  res.status(200).json({ data: null })
}

export default login
