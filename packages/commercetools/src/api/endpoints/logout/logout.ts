import { removeCustomerCookie } from '../../../utils'
import type { LogoutEndpoint } from '.'

const logout: LogoutEndpoint['handlers']['logout'] = async ({
  res,
  body: { redirectTo },
}) => {
  removeCustomerCookie(res)
  // Only allow redirects to a relative URL
  if (redirectTo?.startsWith('/')) {
    res.redirect(redirectTo)
  } else {
    res.status(200).json({ data: null })
  }
}

export default logout
