import { NextApiRequest } from 'next'
import { COMMERCETOOLS_COOKIE_EXPIRE } from '../const'
import { serialize, CookieSerializeOptions } from 'cookie'
import { ServerResponse } from 'http'

const cookieExpirationInDays = COMMERCETOOLS_COOKIE_EXPIRE * 60 * 60 * 24

const options: CookieSerializeOptions = {
  maxAge: cookieExpirationInDays,
  expires: new Date(Date.now() + cookieExpirationInDays * 1000),
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  sameSite: 'lax',
}

export const getCookies = <T>(req: NextApiRequest, name: string) => {
  const cookie = req.cookies[name]
  return cookie ? (JSON.parse(cookie) as T) : undefined
}

export const setCookies = (res: ServerResponse, name: string, value: any) =>
  res.setHeader('Set-Cookie', serialize(name, JSON.stringify(value), options))

export const removeCookies = (res: ServerResponse, name: string) =>
  res.setHeader(
    'Set-Cookie',
    serialize(name, '', {
      maxAge: -1,
      expires: new Date(Date.now()),
      path: '/',
    })
  )
