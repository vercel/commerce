import { FetcherError } from '@commerce/utils/errors'
import type { LoginEndpoint } from '.'

const invalidCredentials = /invalid credentials/i

const login: LoginEndpoint['handlers']['login'] = async ({
  res,
  body: { email, password },
  config,
  commerce,
}) => {
    console.log('login hit', email, password)
  // TODO: Add proper validations with something like Ajv
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  try {
/*
const loginMutation = ` mutation loginAccount($input) { login($input) { } } `
const variables = { input: { email, password } }
const loginResponse = await config.fetch(loginMutation, { variables })
setCookie(res)
*/
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

export default login