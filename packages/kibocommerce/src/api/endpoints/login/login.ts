import type { LoginEndpoint } from '.'

import { FetcherError } from '@vercel/commerce/utils/errors'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

import { loginMutation } from '../../mutations/login-mutation'
import { prepareSetCookie } from '../../../lib/prepare-set-cookie'
import { getCookieExpirationDate } from '../../../lib/get-cookie-expiration-date'

const invalidCredentials = /invalid credentials/i

const login: LoginEndpoint['handlers']['login'] = async ({
  body: { email, password },
  config,
}) => {
  let response
  try {
    const variables = { loginInput: { username: email, password } }
    response = await config.fetch(loginMutation, { variables })
    const { account: token } = response.data

    // Set Cookie
    const cookieExpirationDate = getCookieExpirationDate(
      config.customerCookieMaxAgeInDays
    )

    const authCookie = prepareSetCookie(
      config.customerCookie,
      JSON.stringify(token),
      token.accessTokenExpiration ? { expires: cookieExpirationDate } : {}
    )

    return { data: null, headers: { 'Set-Cookie': authCookie } }
  } catch (error) {
    // Check if the email and password didn't match an existing account
    if (
      error instanceof FetcherError &&
      invalidCredentials.test(error.message)
    ) {
      throw new CommerceAPIError(
        'Cannot find an account that matches the provided credentials',
        {
          status: 401,
          code: 'invalid_credentials',
        }
      )
    } else {
      throw error
    }
  }
}

export default login
