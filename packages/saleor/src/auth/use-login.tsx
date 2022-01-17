import { useCallback } from 'react'

import type { MutationHook } from '@vercel/commerce/utils/types'
import { CommerceError } from '@vercel/commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import * as mutation from '../utils/mutations'
import { Mutation, MutationTokenCreateArgs } from '../../schema'
import useLogin, { UseLogin } from '@vercel/commerce/auth/use-login'
import { setCSRFToken, setToken, throwUserErrors, checkoutAttach, getCheckoutId } from '../utils'
import { LoginHook } from '@vercel/commerce/types/login'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    query: mutation.SessionCreate,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'A first name, last name, email and password are required to login',
      })
    }

    const { tokenCreate } = await fetch<Mutation, MutationTokenCreateArgs>({
      ...options,
      variables: { email, password },
    })

    throwUserErrors(tokenCreate?.errors)

    const { token, csrfToken } = tokenCreate!

    if (token && csrfToken) {
      setToken(token)
      setCSRFToken(csrfToken)

      const { checkoutId } = getCheckoutId()
      checkoutAttach(fetch, {
        variables: { checkoutId },
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
    }

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
