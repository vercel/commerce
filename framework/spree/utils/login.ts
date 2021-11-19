import type { GraphQLFetcherResult } from '@commerce/api'
import type { HookFetcherContext } from '@commerce/utils/types'
import type { AuthTokenAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Authentication'
import type { AssociateCart } from '@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass'
import type { IOrder } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import type {
  IOAuthToken,
  IToken,
} from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import { getCartToken, removeCartToken } from './tokens/cart-token'
import { setUserTokenResponse } from './tokens/user-token-response'

const login = async (
  fetch: HookFetcherContext<{
    data: any
  }>['fetch'],
  getTokenParameters: AuthTokenAttr,
  associateGuestCart: boolean
): Promise<void> => {
  const { data: spreeGetTokenSuccessResponse } = await fetch<
    GraphQLFetcherResult<IOAuthToken>
  >({
    variables: {
      methodPath: 'authentication.getToken',
      arguments: [getTokenParameters],
    },
  })

  setUserTokenResponse(spreeGetTokenSuccessResponse)

  if (associateGuestCart) {
    const cartToken = getCartToken()

    if (cartToken) {
      // If the user had a cart as guest still use its contents
      // after logging in.
      const accessToken = spreeGetTokenSuccessResponse.access_token
      const token: IToken = { bearerToken: accessToken }

      const associateGuestCartParameters: AssociateCart = {
        guest_order_token: cartToken,
      }

      await fetch<GraphQLFetcherResult<IOrder>>({
        variables: {
          methodPath: 'cart.associateGuestCart',
          arguments: [token, associateGuestCartParameters],
        },
      })

      // We no longer need the guest cart token, so let's remove it.
    }
  }

  removeCartToken()
}

export default login
