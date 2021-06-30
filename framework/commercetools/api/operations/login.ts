import type { ServerResponse } from 'http'
import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { Provider, CommercetoolsConfig } from '@framework/api'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends { variables: any; data: any }>(opts: {
    variables: T['variables']
    config?: Partial<CommercetoolsConfig>
    res: ServerResponse
  }): Promise<T['data']>

  async function login<T extends { variables: any; data: any }>(
    opts: {
      variables: T['variables']
      config?: Partial<CommercetoolsConfig>
      res: ServerResponse
    } & OperationOptions
  ): Promise<T['data']>

  async function login<T extends { variables: any; data: any }>({
    query = '',
    variables,
    res: response,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    res: ServerResponse
    config?: Partial<CommercetoolsConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    return {
      result: '',
    }
  }

  return login
}
