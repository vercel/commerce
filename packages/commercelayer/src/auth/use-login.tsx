import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { MutationHook } from '@vercel/commerce/utils/types'
import useLogin, { UseLogin } from '@vercel/commerce/auth/use-login'
import { CommerceError } from '@vercel/commerce/utils/errors'
import { getCustomerToken } from '@commercelayer/js-auth'
import setCookie from '../api/utils/cookies'
import Cookies from 'js-cookie'
import { ENDPOINT, CLIENTID, SCOPE } from '../const'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '',
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
        { username: email, password: password }
      )
      token &&
        setCookie('CL_CUSTOMER_TOKEN', token.accessToken, {
          expires: token.expires,
        })
      Cookies.set('CL_CUSTOMER_ID', token?.data.owner_id as string)
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
      const { mutate } = useCustomer()
      return useCallback(
        async function login(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch]
      )
    },
}
