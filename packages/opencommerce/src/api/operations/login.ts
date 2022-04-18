import type { ServerResponse } from 'http'
import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { LoginOperation } from '../../types/login'
import type { AuthenticateMutation } from '../../../schema'
import type { RecursivePartial } from '../utils/types'
import loginMutation from '../mutations/authenticate'
import type { OpenCommerceConfig, Provider } from '..'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>(opts: {
    variables: T['variables']
    config?: OpenCommerceConfig
    res: ServerResponse
  }): Promise<T['data']>

  async function login<T extends LoginOperation>(
    opts: {
      variables: T['variables']
      config?: OpenCommerceConfig
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
    config?: OpenCommerceConfig
  }): Promise<T['data']> {
    const { fetch } = commerce.getConfig(cfg)

    const { data } = await fetch<RecursivePartial<AuthenticateMutation>>(
      query,
      { variables }
    )

    return {
      result: data.authenticate?.tokens?.accessToken ?? undefined,
    }
  }

  return login
}
