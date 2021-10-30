import { serialize } from 'cookie'
import sdkFetcherFunction from '../../utils/sdk-fetch'
import type { LoginEndpoint } from '.'

const getRedirectUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

const login: LoginEndpoint['handlers']['login'] = async ({
  req,
  res,
  config: { sdkFetch, customerCookie },
}) => {
  const sdkFetcher: typeof sdkFetcherFunction = sdkFetch
  const redirectUrl = getRedirectUrl()
  try {
    const loginToken = req.query?.param?.[0]
    const { jwt } = await sdkFetcher('customer', 'getToken', loginToken, false)
    res.setHeader(
      'Set-Cookie',
      serialize(customerCookie, jwt, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      })
    )
    res.redirect(redirectUrl)
  } catch {
    res.redirect(redirectUrl)
  }
}

export default login
