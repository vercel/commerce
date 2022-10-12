import { serialize } from 'cookie'
import sdkFetcherFunction from '../../utils/sdk-fetch'
import { getDeploymentUrl } from '../../../utils/get-deployment-url'
import type { LoginEndpoint } from '.'

const login: LoginEndpoint['handlers']['login'] = async ({
  req,
  config: { sdkFetch, customerCookie },
}) => {
  const sdkFetcher: typeof sdkFetcherFunction = sdkFetch
  const redirectUrl = getDeploymentUrl()
  const { searchParams } = new URL(req.url)
  try {
    const loginToken = searchParams.get('token')

    if (!loginToken) {
      return { redirectTo: redirectUrl }
    }
    const { jwt } = await sdkFetcher('customer', 'getToken', loginToken, false)

    return {
      redirectTo: redirectUrl,
      headers: {
        'Set-Cookie': serialize(customerCookie, jwt, {
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24,
          path: '/',
        }),
      },
    }
  } catch {
    return { redirectTo: redirectUrl }
  }
}

export default login
