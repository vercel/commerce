import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { LoginOperation } from '@vercel/commerce/types/login'
import type { LoginMutation } from '../../../schema'
import type { RecursivePartial } from '../utils/types'
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
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: BigcommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    query = loginMutation,
    variables,
    config,
  }: {
    query?: string
    variables: T['variables']

    config?: BigcommerceConfig
  }): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data, res } = await config.fetch<RecursivePartial<LoginMutation>>(
      query,
      { variables }
    )

    const headers = new Headers()

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

      headers.set('Set-Cookie', cookie)
    }

    return {
      result: data.login?.result,
      headers,
      status: res.status,
    }
  }

  return login
}
