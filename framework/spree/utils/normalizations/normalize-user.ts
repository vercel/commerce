import type { Customer } from '@commerce/types/customer'
import type { AccountAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Account'
import type { SpreeSdkResponse } from '../../types'

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
