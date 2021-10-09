import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useSubscribe, { UseSubscribe } from '@commerce/subscriptions/use-subscribe'
import type { SubscriptionsHook } from '../types/subscriptions'


export default useSubscribe as UseSubscribe<typeof handler>

export const handler: MutationHook<SubscriptionsHook> = {
  fetchOptions: {
    url: '/api/subscribe',
    method: 'POST',
  },
  async fetcher({ input: { email, firstName, lastName, source }, options, fetch }) {
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
  useHook: ({ fetch }) => () => {

    return useCallback(
      async function subscribe(input) {
        const data = await fetch({ input })
        return data
      },
      [fetch]
    )
  },
}