import type { CustomerEndpoint } from '.'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] =
  async ({ req, config: { restBuyerFetch, tokenCookie } }) => {
    const token = req.cookies.get(tokenCookie)?.value

    if (token) {
      const customer = await restBuyerFetch('GET', '/me', undefined, {
        token,
      })

      if (!customer) {
        throw new CommerceAPIError('Customer not found', {
          status: 404,
        })
      }

      return {
        data: {
          customer: {
            id: customer.ID,
            firstName: customer.FirstName,
            lastName: customer.LastName,
            email: customer.Email,
          },
        },
      }
    }

    return { data: null }
  }

export default getLoggedInCustomer
