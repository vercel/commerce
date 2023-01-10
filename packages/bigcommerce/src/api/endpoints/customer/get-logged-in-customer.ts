import type { GetLoggedInCustomerQuery } from '../../../../schema'
import type { CustomerEndpoint } from '.'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

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
  async ({ req, config }) => {
    const token = req.cookies.get(config.customerCookie)?.value

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
        throw new CommerceAPIError('Customer not found', {
          status: 404,
        })
      }

      return {
        data: {
          customer: {
            id: String(customer.entityId),
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            company: customer.company,
            phone: customer.phone,
            notes: customer.notes,
          },
        },
      }
    }

    return {
      data: null,
    }
  }

export default getLoggedInCustomer
