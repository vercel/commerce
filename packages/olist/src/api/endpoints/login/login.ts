import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

import { FetcherError } from '@vercel/commerce/utils/errors'

import type { Handler, LoginEndpoint } from '.'

export const invalidCredentials = /email and\/or password invalid/i

const login: LoginEndpoint['handlers']['login'] = async ({
  res: response,
  body: { email, password },
  config: { apiToken, customerTokenCookie, service },
}: Handler) => {
  if (!email || !password) {
    return response.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
    const { id } = await service.client.login({ email, password })

    if (id) {
      response.setHeader('Set-Cookie', [
        serialize(
          customerTokenCookie,
          sign({ id: id.toString() }, apiToken, { expiresIn: 60 * 60 }),
          {
            maxAge: 60 * 60,
            expires: new Date(Date.now() + 60 * 60 * 1000),
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
          }
        ),
      ])
    }
  } catch (error) {
    if (
      error instanceof FetcherError &&
      invalidCredentials.test(error.message)
    ) {
      return response.status(401).json({
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

  response.status(200).json({ data: null })
}

export default login
