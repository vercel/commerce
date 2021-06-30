import type { ServerResponse } from 'http'
import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { LoginOperation } from '../../types/login'
import { Provider, CommercetoolsConfig } from '..'
import { loginMutation } from '../../utils/mutations/log-in-mutation'
import { serialize } from 'cookie'
const jwt = require('jwt-simple')

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: Partial<CommercetoolsConfig>
    res: ServerResponse
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<CommercetoolsConfig>
      res: ServerResponse
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    query = loginMutation,
    variables,
    config: cfg,
    res: response,
  }: {
    query?: string
    variables: T['variables']
    res: ServerResponse
    config?: Partial<CommercetoolsConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    const expireTime = new Date(Date.now() + 30 * 30) // 1 month

    const { data } = await config.fetch<any>(query, {
      variables,
    })

    if (data) {
      const customerToken = jwt.encode(
        data.customerSignIn.customer.id,
        config.customerCookie
      )
      response.setHeader('Set-Cookie', [
        serialize(config.customerCookie, customerToken, {
          maxAge: 30,
          path: '/',
          expires: expireTime,
        }),
      ])

      return { result: data.customerSignIn.customer.id }
    } else {
      return {}
    }
  }
  return login
}
