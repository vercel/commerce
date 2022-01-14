import CookieHandler from '../../../api/utils/cookie-handler'
import type { CustomerEndpoint } from '.'
import { getCustomerAccountQuery } from '../../queries/get-customer-account-query'
import { normalizeCustomer } from '../../../lib/normalize'

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] = async ({
  req,
  res,
  config,
}) => {
  const cookieHandler = new CookieHandler(config, req, res)
  let accessToken = cookieHandler.getAccessToken();

  if (!cookieHandler.isShopperCookieAnonymous()) {
    const { data } = await config.fetch(getCustomerAccountQuery, undefined, {
      headers: {
        'x-vol-user-claims': accessToken,
      },
    })

    const customer = normalizeCustomer(data?.customerAccount)
    
    if (!customer.id) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Customer not found', code: 'not_found' }],
      })
    }

    return res.status(200).json({ data: { customer } })
  }

  res.status(200).json({ data: null })
}

export default getLoggedInCustomer
