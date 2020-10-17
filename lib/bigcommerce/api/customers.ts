import createApiHandler, {
  BigcommerceApiHandler,
  BigcommerceHandler,
} from './utils/create-api-handler'
import isAllowedMethod from './utils/is-allowed-method'
import { BigcommerceApiError } from './utils/errors'

type Body<T> = Partial<T> | undefined

export type Customer = any

export type AddCustomerBody = { item: any }

export type CartHandlers = {
  addItem: BigcommerceHandler<Customer, { cartId?: string } & Body<any>>
}

const METHODS = ['POST']

const customersApi: BigcommerceApiHandler<Customer> = async (
  req,
  res,
  config
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    if (req.method === 'POST') {
      // let result = {} as any
      // const
      // result = await config.storeApiFetch('/v3/customers')
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

const createCustomer: BigcommerceHandler<Customer> = ({
  req,
  res,
  body,
  config,
}) => {}

const handlers = {
  createCustomer,
}

export default createApiHandler(customersApi, handlers, {})
