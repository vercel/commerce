import { FetcherError } from '@commerce/utils/errors'
import type { LoginEndpoint } from '.'
import { loginMutation } from '../../../utils/mutations/login-mutation'
import {prepareSetCookie} from '../../utils/prepareSetCookie';
import {setCookies} from '../../utils/setCookie'

const invalidCredentials = /invalid credentials/i

let response;

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

    response = await  config.fetch(loginMutation, { variables: { loginInput : { username: email, password }}})
    const { account }  = response.data;

    const authCookie = prepareSetCookie(
      config.customerCookie,
      JSON.stringify(account),
      account.accessTokenExpiration ? { expires: new Date(account.accessTokenExpiration) }: {},
    )
    setCookies(res, [authCookie])   
    
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

  res.status(200).json({ data: response })
}

export default login