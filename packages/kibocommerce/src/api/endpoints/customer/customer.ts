import CookieHandler from '../../../api/utils/cookie-handler'
import type { CustomerEndpoint } from '.'
import { getCustomerAccountQuery } from '../../queries/get-customer-account-query'
import { normalizeCustomer } from '../../../lib/normalize'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] =
  async ({ req, config }) => {
    const cookieHandler = new CookieHandler(config, req)
    let accessToken = cookieHandler.getAccessToken()

    if (!cookieHandler.isShopperCookieAnonymous()) {
      const { data } = await config.fetch(getCustomerAccountQuery, undefined, {
        headers: {
          'x-vol-user-claims': accessToken,
        },
      })

      const customer = normalizeCustomer(data?.customerAccount)

      if (!customer.id) {
        throw new CommerceAPIError('Customer not found', {
          status: 404,
        })
      }

      return { data: { customer } }
    }

    return { data: null }
  }

export default getLoggedInCustomer
