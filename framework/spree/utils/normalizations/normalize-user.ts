import type { Customer } from '@commerce/types/customer'
import type { SpreeSdkResponse } from '@framework/types'
import type { AccountAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Account'

const normalizeUser = (
  _spreeSuccessResponse: SpreeSdkResponse,
  spreeUser: AccountAttr
): Customer => {
  const email = spreeUser.attributes.email

  return {
    email,
  }
}

export default normalizeUser
