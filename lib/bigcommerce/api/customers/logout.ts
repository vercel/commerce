import createApiHandler, {
  BigcommerceApiHandler,
  BigcommerceHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'
import { BigcommerceApiError } from '../utils/errors'
import logout from './handlers/logout'

export type LogoutHandlers = {
  logout: BigcommerceHandler<null, { redirectTo?: string }>
}

const METHODS = ['GET']

const logoutApi: BigcommerceApiHandler<null, LogoutHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    const redirectTo = req.query.redirect_to
    const body = typeof redirectTo === 'string' ? { redirectTo } : {}

    return await handlers['logout']({ req, res, config, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof BigcommerceApiError
        ? 'An unexpected error ocurred with the Bigcommerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

const handlers = { logout }

export default createApiHandler(logoutApi, handlers, {})
