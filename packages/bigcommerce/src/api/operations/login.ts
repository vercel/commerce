import type { ServerResponse } from 'http'
import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { LoginOperation } from '../../types/login'
import type { LoginMutation } from '../../../schema'
import type { RecursivePartial } from '../utils/types'
import concatHeader from '../utils/concat-cookie'
import type { BigcommerceConfig, Provider } from '..'

export const loginMutation = /* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      result
    }
  }
`

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: BigcommerceConfig
    res: ServerResponse
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: BigcommerceConfig
      res: ServerResponse
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    query = loginMutation,
    variables,
    res: response,
    config,
  }: {
    query?: string
    variables: T['variables']
    res: ServerResponse
    config?: BigcommerceConfig
  }): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data, res } = await config.fetch<RecursivePartial<LoginMutation>>(
      query,
      { variables }
    )
    // Bigcommerce returns a Set-Cookie header with the auth cookie
    let cookie = res.headers.get('Set-Cookie')

    if (cookie && typeof cookie === 'string') {
      // In development, don't set a secure cookie or the browser will ignore it
      if (process.env.NODE_ENV !== 'production') {
        cookie = cookie.replace('; Secure', '')
        // SameSite=none can't be set unless the cookie is Secure
        // bc seems to sometimes send back SameSite=None rather than none so make
        // this case insensitive
        cookie = cookie.replace(/; SameSite=none/gi, '; SameSite=lax')
      }

      response.setHeader(
        'Set-Cookie',
        concatHeader(response.getHeader('Set-Cookie'), cookie)!
      )
    }

    return {
      result: data.login?.result,
    }
  }

  return login
}
