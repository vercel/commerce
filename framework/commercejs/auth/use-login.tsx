import { useCallback } from 'react'
import { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import type { LoginHook } from '@commerce/types/login'

export default useLogin as UseLogin<typeof handler>

// Gets the URL that will be sent in the login email.
// If deployed on Vercel we have the VERCEL_URL env vars, otherwise assume localhost.
const getLoginCallbackUrl = () => {
  const API_ROUTE_PATH = 'api/login'
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${API_ROUTE_PATH}`
  }
  return `http://localhost:3000/${API_ROUTE_PATH}`
}

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    query: 'customer',
    method: 'login',
  },
  async fetcher({ input, options: { query, method }, fetch }) {
    await fetch({
      query,
      method,
      variables: [input.email, getLoginCallbackUrl()],
    })
    return null
  },
  useHook: ({ fetch }) =>
    function useHook() {
      return useCallback(async function login(input) {
        return fetch({ input })
      }, [])
    },
}
