import { serialize } from 'cookie'
import type { LogoutEndpoint } from '.'

const logout: LogoutEndpoint['handlers']['logout'] = async ({
  body: { redirectTo },
  config,
}) => {
  const headers = {
    'Set-Cookie': serialize(config.customerCookie, '', {
      maxAge: -1,
      path: '/',
    }),
  }

  return redirectTo
    ? {
        redirectTo,
        headers,
      }
    : {
        headers,
      }
}

export default logout
