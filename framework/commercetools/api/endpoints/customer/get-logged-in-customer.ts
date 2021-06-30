import type { CustomerEndpoint } from '.'
import getCustomerQuery from '../../../utils/queries/get-customer-query'
const jwt = require('jwt-simple')

export const getLoggedInCustomerQuery = getCustomerQuery
export type Customer = NonNullable<any['customer']>
const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] = async ({
  req,
  res,
  config,
}) => {
  const { customerCookie } = config

  // customerId
  if (req.cookies[config.customerCookie]) {
    const id = jwt.decode(req.cookies[config.customerCookie], customerCookie)

    if (id) {
      const { data } = await config.fetch<any>(getCustomerQuery, {
        variables: { id },
      })

      const { customer } = data

      if (!customer) {
        return res.status(400).json({
          data: null,
          errors: [{ message: 'Customer not found', code: 'not_found' }],
        })
      }

      return res.status(200).json({ data: { customer } })
    }
  }

  res.status(200).json({ data: null })
}

export default getLoggedInCustomer
