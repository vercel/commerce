import type { SignupEndpoint } from '.'

import { decode, type JwtPayload } from 'jsonwebtoken'
import { serialize } from 'cookie'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  req,
  body: { firstName, lastName, password, email },
  config: { restBuyerFetch, tokenCookie },
}) => {
  // Get token
  const token = req.cookies.get(tokenCookie)?.value

  const accessToken = await restBuyerFetch(
    'PUT',
    `/me/register`,
    {
      Username: email,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Active: true,
    },
    {
      token,
      anonToken: true,
    }
  ).then((response: any) => {
    return response.access_token
  })

  if (!accessToken) {
    throw new CommerceAPIError('Failed to retrieve access token', {
      status: 401,
    })
  }

  const decodedToken = decode(accessToken) as JwtPayload
  if (!decodedToken || !decodedToken.exp) {
    throw new CommerceAPIError('Failed to decode access token', {
      status: 500,
    })
  }

  return {
    headers: {
      'Set-Cookie': serialize(tokenCookie, accessToken, {
        expires: new Date(decodedToken.exp * 1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      }),
    },
    data: null,
  }
}

export default signup
