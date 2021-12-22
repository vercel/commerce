import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { MutationHook } from '@commerce/utils/types'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import { CommerceError } from '@commerce/utils/errors'
import { getCustomerToken } from '@commercelayer/js-auth'
import setCookie from '../api/utils/cookies'
import Cookies from 'js-cookie'
import { ENDPOINT, CLIENTID, SCOPE } from '../const'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: 'customers',
    url: `${ENDPOINT}/api/customers`,
    method: 'POST',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to signup',
      })
    }

    try {
      const data = await fetch({
        ...options,
        variables: {
          email,
          password,
        },
      })
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
      Cookies.set('CL_CUSTOMER_ID', data.id)
      alert(`User "${email}" has successfully been created.`)
      return data
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
        async function signup(input) {
          const data = await fetch({ input })
          await mutate()
          return data
        },
        [fetch]
      )
    },
}
