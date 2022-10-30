import type { SignupEndpoint } from '.'

import { FetcherError } from '@vercel/commerce/utils/errors'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

import {
  registerUserMutation,
  registerUserLoginMutation,
} from '../../mutations/signup-mutation'
import { prepareSetCookie } from '../../../lib/prepare-set-cookie'
import { getCookieExpirationDate } from '../../../lib/get-cookie-expiration-date'

const invalidCredentials = /invalid credentials/i

const signup: SignupEndpoint['handlers']['signup'] = async ({
  body: { email, password, firstName, lastName },
  config,
}) => {
  let response
  try {
    // Register user
    const registerUserVariables = {
      customerAccountInput: {
        emailAddress: email,
        firstName: firstName,
        lastName: lastName,
        acceptsMarketing: true,
        id: 0,
      },
    }

    const registerUserResponse = await config.fetch(registerUserMutation, {
      variables: registerUserVariables,
    })
    const accountId = registerUserResponse.data?.account?.id

    // Login user
    const registerUserLoginVairables = {
      accountId: accountId,
      customerLoginInfoInput: {
        emailAddress: email,
        username: email,
        password: password,
        isImport: false,
      },
    }

    response = await config.fetch(registerUserLoginMutation, {
      variables: registerUserLoginVairables,
    })
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

    return {
      data: response,
      headers: {
        'Set-Cookie': authCookie,
      },
    }
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

export default signup
