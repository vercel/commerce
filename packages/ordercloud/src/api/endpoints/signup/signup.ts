import type { SignupEndpoint } from '.'

import { decode, type JwtPayload } from 'jsonwebtoken'
import { serialize } from 'cookie'
import { access } from 'fs'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  req,
  body: { firstName, lastName, password, email },
  config: { restBuyerFetch, tokenCookie },
}) => {
  // Get token
  const token = req.cookies.get(tokenCookie)?.value
  let headers: any = {}

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

  console.log('got access token: ', accessToken)

  if (accessToken) {
    const decodedToken = decode(accessToken) as JwtPayload

    console.log('decoded: ', decodedToken)

    return {
      headers: {
        'Set-Cookie': serialize(tokenCookie, accessToken, {
          maxAge: decodedToken.exp,
          expires: new Date(Date.now() + decodedToken.exp! * 1000),
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }),
      },
    }
  }

  return { data: undefined, headers }
}

export default signup
