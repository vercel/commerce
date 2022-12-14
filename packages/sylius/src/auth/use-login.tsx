import { MutationHook } from '@vercel/commerce/utils/types'
import useLogin, { UseLogin } from '@vercel/commerce/auth/use-login'
import { useCallback } from 'react'
import useCustomer from '@vercel/commerce/customer/use-customer'
import { setCustomerToken } from '../utils/token/customer-token'
import { setCustomerId } from '../utils/token/customer-id'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/authentication-token',
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
    console.log(authReturn)
    const custumerRouteParts = authReturn.customer.split('/')
    console.log(custumerRouteParts)
    setCustomerId(custumerRouteParts[5])
    return null
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
