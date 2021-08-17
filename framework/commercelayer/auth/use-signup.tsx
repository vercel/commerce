import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { MutationHook } from '@commerce/utils/types'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import { CommerceError } from '@commerce/utils/errors'
import {ENDPOINT} from '../const'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: 'customers',
    url: `${ENDPOINT}/api/customers`,
    method: 'POST'
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
      return async function signup(input) {
        const data = await fetch({ input })
        return data
      }
    },
}
