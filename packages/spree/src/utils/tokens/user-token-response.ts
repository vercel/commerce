import { requireConfigValue } from '../../isomorphic-config'
import Cookies from 'js-cookie'
import type { IOAuthToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import UserTokenResponseParseError from '../../errors/UserTokenResponseParseError'

export const getUserTokenResponse = (): IOAuthToken | undefined => {
  const stringifiedToken = Cookies.get(
    requireConfigValue('userCookieName') as string
  )

  if (!stringifiedToken) {
    return undefined
  }

  try {
    const token: IOAuthToken = JSON.parse(stringifiedToken)

    return token
  } catch (parseError) {
    throw new UserTokenResponseParseError(
      'Could not parse stored user token response.'
    )
  }
}

/**
 * Retrieves the saved user token response. If the response fails json parsing,
 * removes the saved token and returns @type {undefined} instead.
 */
export const ensureUserTokenResponse = (): IOAuthToken | undefined => {
  try {
    return getUserTokenResponse()
  } catch (error) {
    if (error instanceof UserTokenResponseParseError) {
      removeUserTokenResponse()

      return undefined
    }

    throw error
  }
}

export const setUserTokenResponse = (token: IOAuthToken) => {
  const cookieOptions = {
    expires: requireConfigValue('userCookieExpire') as number,
  }

  Cookies.set(
    requireConfigValue('userCookieName') as string,
    JSON.stringify(token),
    cookieOptions
  )
}

export const removeUserTokenResponse = () => {
  Cookies.remove(requireConfigValue('userCookieName') as string)
}
