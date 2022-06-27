import type { CustomerEndpoint } from '.'
import { getCustomerId, normalizeCustomer } from '../../../utils'
import { ClientResponse, Customer } from '@commercetools/platform-sdk'

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] =
  async ({ req, res, config }) => {
    const customerId = getCustomerId(req)
    if (customerId) {
      const response = await config.sdkFetch<ClientResponse<Customer>>({
        query: 'customers',
        method: 'get',
        variables: {
          id: customerId,
        },
      })
      if (response.body) {
        const data = { customer: normalizeCustomer(response.body) }
        res.status(200).json({ data })
        return
      }
    }
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Customer not found', code: 'not_found' }],
    })
  }

export default getLoggedInCustomer
