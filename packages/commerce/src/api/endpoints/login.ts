import type { LoginSchema } from '../../types/login'
import { CommerceAPIError } from '../utils/errors'
import isAllowedOperation from '../utils/is-allowed-operation'
import type { GetAPISchema } from '..'

const loginEndpoint: GetAPISchema<
  any,
  LoginSchema<any>
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers } = ctx

  if (
    !isAllowedOperation(req, res, {
      POST: handlers['login'],
      GET: handlers['login'],
    })
  ) {
    return
  }

  try {
    const body = req.body ?? {}
    return await handlers['login']({ ...ctx, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof CommerceAPIError
        ? 'An unexpected error ocurred with the Commerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export default loginEndpoint
