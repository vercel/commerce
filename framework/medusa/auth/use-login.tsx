import { MutationHook, MutationHookContext } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import { useCustomer } from '../customer'
import { useCallback } from 'react'
import { LoginHook } from '@commerce/types/login'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/login',
    method: 'GET',
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }

    await fetch({
      ...options,
      body: { email: email, password: password },
    }).catch((_e) => {
      throw new CommerceError({
        errors: [
          new ValidationError({
            message:
              'A user with that email and password combination does not exist',
          }),
        ],
      })
    })
  },
  useHook: ({ fetch }: MutationHookContext<LoginHook>) =>
    function useHook() {
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
