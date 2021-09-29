import { useCallback } from 'react'
// import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useSubscriptions from '@commerce/subscriptions/use-subscriptions'
// import type { SubscriptionsHook } from '../types/subscriptions'


export default useSubscriptions as any

export const handler: any = {
  fetchOptions: {
    url: '/api/subscribe',
    method: 'POST',
  },
  async fetcher({ input: { email, firstName, lastName, source }, options, fetch }: any) {
    if (!(email)) {
      throw new CommerceError({
        message:
          'An email is required to subscribe',
      })
    }

    return fetch({
      ...options,
      body: { email, firstName, lastName, source },
    })
  },
  useHook: ({ fetch }: any) => () => {

    return useCallback(
      async function subscribe(input) {
        const data = await fetch({ input })
        return data
      },
      [fetch]
    )
  },
}