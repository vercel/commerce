import { FetcherError } from '@commerce/utils/errors'
import type { SignupEndpoint } from '.'
import { registerUserMutation, registerUserLoginMutation } from '../../mutations/signup-mutation'
import { prepareSetCookie } from '../../../lib/prepare-set-cookie';
import { setCookies } from '../../../lib/set-cookie'
import { getCookieExpirationDate } from '../../../lib/get-cookie-expiration-date'

const invalidCredentials = /invalid credentials/i

const signup: SignupEndpoint['handlers']['signup'] = async ({
  req,
  res,
  body: { email, password, firstName, lastName },
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

    // Register user
    const registerUserVariables = {
      customerAccountInput: {
          emailAddress: email,
          firstName: firstName,
          lastName: lastName,
          acceptsMarketing: true,
          id: 0
        }
    }
    
    const registerUserResponse = await  config.fetch(registerUserMutation, { variables: registerUserVariables})
    const accountId  = registerUserResponse.data?.account?.id;

    // Login user
    const registerUserLoginVairables = {
      accountId: accountId,
      customerLoginInfoInput: {
          emailAddress: email,
          username: email,
          password: password,
          isImport: false
      }
    }

    response = await  config.fetch(registerUserLoginMutation, { variables: registerUserLoginVairables})
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

export default signup