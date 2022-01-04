import { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import type { LogoutHook } from '@commerce/types/logout'
import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import useCart from '../cart/use-cart'
import useWishlist from '../wishlist/use-wishlist'
import {
  ensureUserTokenResponse,
  removeUserTokenResponse,
} from '../utils/tokens/user-token-response'
import revokeUserTokens from '../utils/tokens/revoke-user-tokens'
import TokensNotRejectedError from '../errors/TokensNotRejectedError'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'authentication',
    query: 'revokeToken',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useLogout fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const userToken = ensureUserTokenResponse()

    if (userToken) {
      try {
        // Revoke any tokens associated with the logged in user.
        await revokeUserTokens(fetch, {
          accessToken: userToken.access_token,
          refreshToken: userToken.refresh_token,
        })
      } catch (revokeUserTokenError) {
        // Squash token revocation errors and rethrow anything else.
        if (!(revokeUserTokenError instanceof TokensNotRejectedError)) {
          throw revokeUserTokenError
        }
      }

      // Whether token revocation succeeded or not, remove them from local storage.
      removeUserTokenResponse()
    }

    return null
  },
  useHook: ({ fetch }) => {
    const useWrappedHook: ReturnType<MutationHook<LogoutHook>['useHook']> =
      () => {
        const customer = useCustomer({
          swrOptions: { isPaused: () => true },
        })
        const cart = useCart({
          swrOptions: { isPaused: () => true },
        })
        const wishlist = useWishlist({
          swrOptions: { isPaused: () => true },
        })

        return useCallback(async () => {
          const data = await fetch()

          await customer.mutate(null, false)
          await cart.mutate(null, false)
          await wishlist.mutate(null, false)

          return data
        }, [customer, cart, wishlist])
      }

    return useWrappedHook
  },
}
