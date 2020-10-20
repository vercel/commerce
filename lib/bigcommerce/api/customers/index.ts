import createApiHandler, {
  BigcommerceApiHandler,
  BigcommerceHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'
import { BigcommerceApiError } from '../utils/errors'
import createCustomer from './handlers/create-customer'

type Body<T> = Partial<T> | undefined

export type Customer = null

export type CreateCustomerBody = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type CustomersHandlers = {
  createCustomer: BigcommerceHandler<
    Customer,
    { cartId?: string } & Body<CreateCustomerBody>
  >
}

const METHODS = ['POST']

const customersApi: BigcommerceApiHandler<Customer, CustomersHandlers> = async (
  req,
  res,
  config
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  try {
    if (req.method === 'POST') {
      const body = { ...req.body, cartId }
      return await handlers['createCustomer']({ req, res, config, body })
    }
  } catch (error) {
    console.error(error)

    const message =
      error instanceof BigcommerceApiError
        ? 'An unexpected error ocurred with the Bigcommerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

const handlers = { createCustomer }

export default createApiHandler(customersApi, handlers, {})
