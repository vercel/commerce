import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

import type { Handler, SignupEndpoint } from '.'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  res: response,
  body: { firstName, lastName, email, password },
  config: { apiToken, customerTokenCookie, service },
}: Handler) => {
  if (!(firstName && lastName && email && password)) {
    return response.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  try {
    const { id } = await service.client.signup({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation: password,
    })

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
    throw error
  }

  response.status(200).json({ data: null })
}

export default signup
