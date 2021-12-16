import { useCallback } from 'react'
import { MutationHook } from '@commerce/utils/types'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import type { LoginHook } from '@commerce/types/login'
import { getDeploymentUrl } from '../utils/get-deployment-url'

export default useLogin as UseLogin<typeof handler>

const getLoginCallbackUrl = () => {
  const baseUrl = getDeploymentUrl()
  const API_ROUTE_PATH = 'api/login'
  return `${baseUrl}/${API_ROUTE_PATH}`
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
