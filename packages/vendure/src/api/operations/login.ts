import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { ValidationError } from '@vercel/commerce/utils/errors'
import type { LoginOperation } from '@vercel/commerce/types/login'
import type { LoginMutation } from '../../../schema'
import { Provider, VendureConfig } from '..'
import { loginMutation } from '../../utils/mutations/log-in-mutation'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: Partial<VendureConfig>
    res: Response
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<VendureConfig>
      res: Response
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends LoginOperation>({
    query = loginMutation,
    variables,
    res: response,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    res: Response
    config?: Partial<VendureConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data, res } = await config.fetch<LoginMutation>(query, {
      variables,
    })
    switch (data.login.__typename) {
      case 'NativeAuthStrategyError':
      case 'InvalidCredentialsError':
      case 'NotVerifiedError':
        throw new ValidationError({
          code: data.login.errorCode,
          message: data.login.message,
        })
    }
    return {
      result: data.login.id,
    }
  }

  return login
}
