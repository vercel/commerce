import { serialize } from 'cookie'
import sdkFetcherFunction from '../../utils/sdk-fetch'
import { getDeploymentUrl } from '../../../utils/get-deployment-url'
import type { LoginEndpoint } from '.'

const login: LoginEndpoint['handlers']['login'] = async ({
  req,
  res,
  config: { sdkFetch, customerCookie },
}) => {
  const sdkFetcher: typeof sdkFetcherFunction = sdkFetch
  const redirectUrl = getDeploymentUrl()
  try {
    const loginToken = req.query?.token as string
    if (!loginToken) {
      res.redirect(redirectUrl)
    }
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
