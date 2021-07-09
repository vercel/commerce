import Cookies from 'js-cookie'
import { getSalesChannelToken } from '@commercelayer/js-auth'

type GetTokenObj = {
  clientId?: string
  endpoint?: string
  scope?: string
  user?: any
}

export async function getToken({
  clientId,
  endpoint,
  scope = 'market:all',
  user,
}: GetTokenObj) {
  const getCookieToken = Cookies.get('clAccessToken')
  if (!getCookieToken && clientId && endpoint) {
    const auth = await getSalesChannelToken(
      {
        clientId,
        endpoint,
        scope,
      },
      user
    )
    Cookies.set('clAccessToken', auth?.accessToken as string, {
      // @ts-ignore
      expires: auth?.expires,
    })
    return auth
      ? {
          accessToken: auth.accessToken,
          customerId: auth.data.owner_id,
          ...auth.data,
        }
      : null
  }
  return { accessToken: getCookieToken }
}
