import { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { CommerceError } from '@commerce/utils/errors'
import { getCustomerToken } from '@commercelayer/js-auth'
import setCookie from '@framework/api/utils/cookies'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    // query: 'login',
    url: '/customer',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }
    const token = await getCustomerToken(
      {
        endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT as string,
        clientId: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID as string,
        scope: process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE as string,
      },
      { username: email, password }
    )
    token &&
      setCookie('CL_TOKEN', token.accessToken, { expires: token.expires })
    return token
  },
  useHook:
    ({ fetch }) =>
    () => {
      return async function login(input) {
        const data = await fetch({ input })
        return data
      }
    },
}
