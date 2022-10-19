import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { LoginOperation } from '@vercel/commerce/types/login'
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
    res: Response
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: BigcommerceConfig
      res: Response
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
    res: Response
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

      const prevCookie = response.headers.get('Set-Cookie')
      const newCookie = concatHeader(prevCookie, cookie)

      if (newCookie) {
        res.headers.set(
          'Set-Cookie',
          String(Array.isArray(newCookie) ? newCookie.join(',') : newCookie)
        )
      }
    }

    return {
      result: data.login?.result,
    }
  }

  return login
}
