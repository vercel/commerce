import { serialize } from 'cookie'
import type { LogoutEndpoint } from '.'

const logout: LogoutEndpoint['handlers']['logout'] = async ({
  res,
  body: { redirectTo },
  config,
}) => {
  // Remove the cookie
  res.setHeader(
    'Set-Cookie',
    serialize(config.customerCookie, '', { maxAge: -1, path: '/' })
  )

  // Only allow redirects to a relative URL
  if (redirectTo?.startsWith('/')) {
    res.redirect(redirectTo)
  } else {
    res.status(200).json({ data: null })
  }
}

export default logout
