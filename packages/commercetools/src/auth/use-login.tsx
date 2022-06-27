import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useCustomer from '../customer/use-customer'
import useLogin, { UseLogin } from '@vercel/commerce/auth/use-login'
import { LoginHook } from '../types/login'
import { CommerceError } from '@vercel/commerce/utils/errors'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    url: '/api/login',
    method: 'post',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }
    return fetch({
      ...options,
      body: { email, password },
    })
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
