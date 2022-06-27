import { COMMERCETOOLS_CART_COOKIE } from '../const'
import { getCookies, setCookies, removeCookies } from './cookies'
import { NextApiRequest } from 'next'
import { ServerResponse } from 'http'

export const getCartId = (req: NextApiRequest) =>
  getCookies<string>(req, COMMERCETOOLS_CART_COOKIE)

export const setCartId = (res: ServerResponse, id: string) =>
  setCookies(res, COMMERCETOOLS_CART_COOKIE, id)

export const removeCartCookie = (res: ServerResponse) =>
  removeCookies(res, COMMERCETOOLS_CART_COOKIE)
