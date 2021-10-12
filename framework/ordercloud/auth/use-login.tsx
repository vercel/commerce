import { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { LoginHook } from '@commerce/types/login'
import { CommerceError } from '@commerce/utils/errors'
import useCustomer from '@commerce/customer/use-customer'
import { useCallback } from 'react'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    url: '/api/login',
    method: 'POST',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message:
          'An email and password are required to login',
      })
    }

    return fetch({
      ...options,
      body: { email, password },
    })
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function login(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
