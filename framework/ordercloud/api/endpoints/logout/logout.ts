import { LogoutEndpoint } from "."

const logout: LogoutEndpoint['handlers']['logout'] = async ({
    res,
    body: { redirectTo },
    config,
  }) => {

    // Remove the buyer token
    global.token = null;
  
    // Only allow redirects to a relative URL
    if (redirectTo?.startsWith('/')) {
      res.redirect(redirectTo)
    } else {
      res.status(200).json({ data: null })
    }
  }
  
  export default logout