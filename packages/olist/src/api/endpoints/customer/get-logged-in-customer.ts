import { verify, TokenExpiredError } from 'jsonwebtoken'

import type { CustomerEndpoint, Handler } from '.'

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] =
  async ({
    req: request,
    res: response,
    config: { apiToken, customerTokenCookie, service },
  }: Handler) => {
    const token = request.cookies[customerTokenCookie]

    if (token) {
      const decoded = verify(token, apiToken)

      try {
        const customer = await service.client.getUserById((decoded as any).id)

        if (!customer) {
          return response.status(400).json({
            data: null,
            errors: [{ message: 'Customer not found', code: 'not_found' }],
          })
        }

        return response.status(200).json({
          data: {
            customer,
          },
        })
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          response.status(401).json({
            data: null,
            errors: [
              {
                message: 'Jwt expired',
                code: 'token_expired_error',
              },
            ],
          })
        }

        throw error
      }
    }

    response.status(200).json({ data: null })
  }

export default getLoggedInCustomer
