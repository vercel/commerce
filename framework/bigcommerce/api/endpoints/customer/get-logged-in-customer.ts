import type { GetLoggedInCustomerQuery } from '../../../schema'
import type { CustomerEndpoint } from '.'

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

export type Customer = NonNullable<GetLoggedInCustomerQuery['customer']>

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] =
  async ({ req, res, config }) => {
    const token = req.cookies[config.customerCookie]

    if (token) {
      const { data } = await config.fetch<GetLoggedInCustomerQuery>(
        getLoggedInCustomerQuery,
        undefined,
        {
          headers: {
            cookie: `${config.customerCookie}=${token}`,
          },
        }
      )
      const { customer } = data

      if (!customer) {
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
