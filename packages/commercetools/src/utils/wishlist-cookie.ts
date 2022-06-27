import { COMMERCETOOLS_WISHLIST_COOKIE } from '../const'
import { getCookies, setCookies, removeCookies } from './cookies'
import { NextApiRequest, NextApiResponse } from 'next'

export const getWishlistId = (req: NextApiRequest) =>
  getCookies<string>(req, COMMERCETOOLS_WISHLIST_COOKIE)

export const setWishlistCookie = (res: NextApiResponse, id: string) =>
  setCookies(res, COMMERCETOOLS_WISHLIST_COOKIE, id)

export const removeWishlistCookie = (res: NextApiResponse) =>
  removeCookies(res, COMMERCETOOLS_WISHLIST_COOKIE)
