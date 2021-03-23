import createApiHandler, {
  AquilacmsApiHandler,
  AquilacmsHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'
import { AquilacmsApiError } from '../utils/errors'
import logout from './handlers/logout'

export type LogoutHandlers = {
  logout: AquilacmsHandler<null, { redirectTo?: string }>
}

const METHODS = ['GET']

const logoutApi: AquilacmsApiHandler<null, LogoutHandlers> = async (
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
      error instanceof AquilacmsApiError
        ? 'An unexpected error ocurred with the Aquilacms API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

const handlers = { logout }

export default createApiHandler(logoutApi, handlers, {})
