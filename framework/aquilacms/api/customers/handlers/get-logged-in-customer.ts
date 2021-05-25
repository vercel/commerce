import type { CustomersHandlers } from '..'
import { normalizeUser } from '../../../lib/normalize'
import type { AquilacmsUser, User } from '../../../types'

export type Customer = User

const getLoggedInCustomer: CustomersHandlers['getLoggedInCustomer'] = async ({
  req,
  res,
  config,
}) => {
  const token = req.cookies[config.customerCookie]

  if (token) {
    try {
      const data = await config.storeApiFetch('/v2/user', {
        method: 'POST',
        body: JSON.stringify({
          PostBody: {},
        }),
        headers: {
          authorization: token,
        },
      })
      if (!data) {
        return res.status(400).json({
          data: null,
          errors: [{ message: 'Customer not found', code: 'not_found' }],
        })
      }
      const customer = normalizeUser(data as AquilacmsUser)
      return res.status(200).json({ data: { customer } })
    } catch (err) {
      console.error(err)
    }
  }

  res.status(200).json({ data: null })
}

export default getLoggedInCustomer
