import { LogoutHandlers } from '../logout'

const logoutHandler: LogoutHandlers['logout'] = async ({
  res,
  body: { redirectTo },
  config,
}) => {
  // Only allow redirects to a relative URL
  if (redirectTo?.startsWith('/')) {
    res.redirect(redirectTo)
  } else {
    res.status(200).json({ data: null })
  }
}

export default logoutHandler
