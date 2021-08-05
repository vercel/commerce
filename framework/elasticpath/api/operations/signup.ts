import type { ServerResponse } from 'http'
import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { SignupOperation } from '../../types/signup'
import { Provider, ElasticpathConfig } from '..'

export default function signupOperation({
  commerce,
}: OperationContext<Provider | any>) {
  async function signup<T extends SignupOperation>(opts: {
    variables: T['variables']
    config?: Partial<ElasticpathConfig>
    res: ServerResponse
  }): Promise<T['data']>

  async function signup<T extends SignupOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<ElasticpathConfig>
      res: ServerResponse
    } & OperationOptions
  ): Promise<T['data']>

  async function signup<T extends SignupOperation>({
    variables,
    res: response,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    res: ServerResponse
    config?: Partial<ElasticpathConfig>
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data } = await config.fetch('account', 'signup', [variables])

    return {
      result: data,
    }
  }

  return signup
}
