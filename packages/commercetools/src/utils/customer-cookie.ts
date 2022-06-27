import { ServerResponse } from 'http'
import { NextApiRequest } from 'next'
import { COMMERCETOOLS_CUSTOMER_COOKIE } from '../const'
import { getCookies, removeCookies, setCookies } from './cookies'

export const getCustomerId = (req: NextApiRequest) =>
  getCookies<string>(req, COMMERCETOOLS_CUSTOMER_COOKIE)

export const setCustomerId = (res: ServerResponse, id: string) => {
  setCookies(res, COMMERCETOOLS_CUSTOMER_COOKIE, id)
}

export const removeCustomerCookie = (res: ServerResponse) =>
  removeCookies(res, COMMERCETOOLS_CUSTOMER_COOKIE)
