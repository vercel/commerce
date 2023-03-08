import type { MutationHook } from '@vercel/commerce/utils/types'
import useLogin, { type UseLogin } from '@vercel/commerce/auth/use-login'

import { useCallback } from 'react'
import { CommerceError } from '@vercel/commerce/utils/errors'
import type { LoginHook } from '@vercel/commerce/types/login'
import useCustomer from '../customer/use-customer'
import useCart from '../cart/use-cart'
export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    url: '/api/commerce/login',
    method: 'POST',
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
      const { mutate: mutateCart } = useCart()
      return useCallback(
        async function login(input) {
          const data = await fetch({ input })
          await mutate()
          await mutateCart()
          return data
        },
        [fetch, mutate, mutateCart]
      )
    },
}
