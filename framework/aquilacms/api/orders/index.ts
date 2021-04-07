import createApiHandler, {
  AquilacmsApiHandler,
  AquilacmsHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'
import { AquilacmsApiError } from '../utils/errors'
import getOrders from './handlers/get-orders'
import { Order } from '../../types'

export type { Order }

export type OrdersData = {
  orders: Order[]
}

export type OrdersHandlers = {
  getOrders: AquilacmsHandler<OrdersData>
}

const METHODS = ['POST']

const ordersApi: AquilacmsApiHandler<OrdersData, OrdersHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    const body = null
    return await handlers['getOrders']({ req, res, config, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof AquilacmsApiError
        ? 'An unexpected error ocurred with the Aquilacms API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

const handlers = { getOrders }

export default createApiHandler(ordersApi, handlers, {})
