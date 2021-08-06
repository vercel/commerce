import { GetAPISchema } from '@commerce/api'
import { CommerceAPIError } from '@commerce/api/utils/errors'
import isAllowedOperation from '@commerce/api/utils/is-allowed-operation'
import { LoginSchema } from '@commerce/types/login'

const loginEndpoint: GetAPISchema<
  any,
  LoginSchema<any>
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers } = ctx
  debugger
  if (
    !isAllowedOperation(req, res, {
      POST: handlers['login'],
    })
  ) {
    return
  }
  debugger
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
