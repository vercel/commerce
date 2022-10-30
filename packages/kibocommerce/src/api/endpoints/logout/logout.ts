import type { LogoutEndpoint } from '.'
import { prepareSetCookie } from '../../../lib/prepare-set-cookie'

const logout: LogoutEndpoint['handlers']['logout'] = async ({
  body: { redirectTo },
  config,
}) => {
  // Remove the cookie
  const authCookie = prepareSetCookie(config.customerCookie, '', {
    maxAge: -1,
    path: '/',
  })

  const headers = {
    'Set-Cookie': authCookie,
  }

  // Only allow redirects to a relative URL
  return redirectTo?.startsWith('/') ? { redirectTo, headers } : { headers }
}

export default logout
