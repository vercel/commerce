import { MutationHook } from '@vercel/commerce/utils/types'
import useLogin, { UseLogin } from '@vercel/commerce/auth/use-login'
import { useCallback } from 'react'
import useCustomer from '@vercel/commerce/customer/use-customer'
import { setCustomerToken } from '../utils/token/customer-token'
import { setCustomerRoute } from '../utils/token/customer-route'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/v2/shop/authentication-token',
    method: 'POST',
  },
  fetcher: async ({ input: { email, password }, options, fetch }) => {
    const authReturn = await fetch({
      url: options.url,
      method: options.method,
      body: {
        email: email,
        password: password,
      },
      variables: {
        useToken: false,
      },
    })

    setCustomerToken(authReturn.token)
    setCustomerRoute(authReturn.customer)
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
        [fetch, mutate]
      )
    },
}
