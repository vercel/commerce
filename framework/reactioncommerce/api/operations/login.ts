import type { ServerResponse } from 'http'
import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { ValidationError } from '@commerce/utils/errors'
import type { LoginOperation } from '../../types/login'
import type { MutationAuthenticateArgs } from '../../schema'
import { Provider, ReactionCommerceConfig } from '..'
import loginMutation from '../../utils/mutations/authenticate'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: Partial<ReactionCommerceConfig>
    res: ServerResponse
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<ReactionCommerceConfig>
      res: ServerResponse
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
    res: ServerResponse
    config?: Partial<ReactionCommerceConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data, res } = await config.fetch<any>(query, {
      variables,
    })

    return {
      result: data.authenticate?.tokens?.accessToken,
    }
  }

  return login
}
