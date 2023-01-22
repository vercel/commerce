import type { LoginEndpoint } from '.'

import { FetcherError } from '@vercel/commerce/utils/errors'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import { getFetchConfig, getToken } from '../..//utils/fetch-rest'
import { serialize } from 'cookie'

const invalidCredentials = /Invalid username or password/i

const login: LoginEndpoint['handlers']['login'] = async ({
  body: { email, password },
  config,
}) => {
  try {
    const token = await getToken({
      grantType: 'password',
      username: email,
      password: password,
      ...getFetchConfig(config),
    })

    if (!token.access_token) {
      throw new CommerceAPIError('Failed to retrieve access token', {
        status: 401,
      })
    }

    return {
      headers: {
        'Set-Cookie': serialize(config.tokenCookie, token.access_token, {
          expires: new Date(Date.now() + token.expires_in * 1000),
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }),
      },
      data: null,
    }
  } catch (error) {
    // Check if the email and password didn't match an existing account
    if (error instanceof FetcherError) {
      throw new CommerceAPIError(
        error.errors.some((e) => invalidCredentials.test(e.message))
          ? 'Cannot find an account that matches the provided credentials'
          : error.message,
        { status: error.status || 401 }
      )
    } else {
      throw error
    }
  }
}

export default login
