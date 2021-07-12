import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useChangePassword , { UseChangePassword } from '@commerce/auth/use-change-password'
import type { ChangePasswordHook } from '../types/change-password'
import useCustomer from '../customer/use-customer'

export default useChangePassword as UseChangePassword<typeof handler>

export const handler: MutationHook<ChangePasswordHook> = {
  fetchOptions: {
    url: '/api/change-password',
    method: 'POST',
  },
  async fetcher({ input: { email, currentPassword, newPassword }, options, fetch }) {
    if (!(email && currentPassword && newPassword)) {
      throw new CommerceError({
        message:
          'An email, current password, and new password are required to change password',
      })
    }

    console.log('fetcher')
    console.dir({ email, currentPassword, newPassword })

    return fetch({
      ...options,
      body: { email, currentPassword, newPassword },
    })
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function changePassword(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
