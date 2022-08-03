import { serialize } from 'cookie'
import type { Handler, LogoutEndpoint } from '.'

const logout: LogoutEndpoint['handlers']['logout'] = async ({
  res: response,
  body: { redirectTo },
  config: { customerTokenCookie },
}: Handler) => {
  response.setHeader(
    'Set-Cookie',
    serialize(customerTokenCookie, '', { maxAge: -1, path: '/' })
  )

  if (redirectTo?.startsWith('/')) {
    response.redirect(redirectTo)
  } else {
    response.status(200).json({ data: null })
  }
}

export default logout
