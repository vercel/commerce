import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { MutationHook } from '@commerce/utils/types'
import useSignup, { UseSignup } from '@commerce/auth/use-signup'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    return null
  },
  useHook:
    ({ fetch }) =>
    () =>
    () => {},
}
