import { GetLoggedInCustomerQuery } from '@lib/bigcommerce/schema'
import type { CustomersHandlers } from '..'

export const getLoggedInCustomerQuery = /* GraphQL */ `
  query getLoggedInCustomer {
    customer {
      entityId
      firstName
      lastName
      email
      company
      customerGroupId
      notes
      phone
      addressCount
      attributeCount
      storeCredit {
        value
        currencyCode
      }
    }
  }
`

const getLoggedInCustomer: CustomersHandlers['getLoggedInCustomer'] = async ({
  res,
  config,
}) => {
  const data = await config.fetch<GetLoggedInCustomerQuery>(
    getLoggedInCustomerQuery
  )
  const { customer } = data

  if (!customer) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Customer not found', code: 'not_found' }],
    })
  }

  res.status(200).json({ data: { customer } })
}

export default getLoggedInCustomer
