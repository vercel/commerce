import type { Customer } from '@vercel/commerce/types/customer'
import type { AccountAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Account'
import type { SpreeSdkResponse } from '../../types'

const normalizeUser = (
  _spreeSuccessResponse: SpreeSdkResponse,
  spreeUser: AccountAttr
): Customer => {
  return {
    id: spreeUser.id,
    email: spreeUser.attributes.email,
    firstName: spreeUser.attributes.firstname,
    lastName: spreeUser.attributes.lastname,
  }
}

export default normalizeUser
