import { FetcherError } from '@commerce/utils/errors'
import type { LoginEndpoint } from '.'
import { loginMutation } from '../../mutations/login-mutation'
import { prepareSetCookie } from '../../../lib/prepare-set-cookie';
import { setCookies } from '../../../lib/set-cookie'
import { getCookieExpirationDate } from '../../../lib/get-cookie-expiration-date'

const invalidCredentials = /invalid credentials/i

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

  let response;
  try {

    const variables = { loginInput : { username: email, password }};
    response = await  config.fetch(loginMutation, { variables })
    const { account: token }  = response.data;
    
    // Set Cookie
    const cookieExpirationDate = getCookieExpirationDate(config.customerCookieMaxAgeInDays)
    
    const authCookie = prepareSetCookie(
      config.customerCookie,
      JSON.stringify(token),
      token.accessTokenExpiration ? { expires: cookieExpirationDate }: {},
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