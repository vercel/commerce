import { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { CommerceError } from '@commerce/utils/errors'
import { getCustomerToken } from '@commercelayer/js-auth'
import { ENDPOINT, CLIENTID, SCOPE } from '../const'
import setCookie from '@framework/api/utils/cookies'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: `${ENDPOINT}/api/customers`,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }
    try {
      const token = await getCustomerToken(
        {
          endpoint: ENDPOINT,
          clientId: CLIENTID,
          scope: SCOPE,
        },
        { username: email, password }
      )
      token &&
        setCookie('CL_TOKEN', token.accessToken, { expires: token.expires })
      alert(`User "${email}" has successfully been logged in.`)
      return token
    } catch (error) {
      throw new CommerceError({
        message: `${error}`,
      })
    }
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
