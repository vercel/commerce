import type { ServerResponse } from 'http'
import type { OperationContext } from '@commerce/api/operations'
import type { Provider, SaleorConfig } from '..'
import {
  throwUserErrors,
} from '../../utils'

import * as Mutation from '../../utils/mutations'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login({
    query = Mutation.SessionCreate,
    variables,
    config,
  }: {
    query?: string
    variables: any 
    res: ServerResponse
    config?: SaleorConfig
  }): Promise<any> {
    config = commerce.getConfig(config)

    const { data: { customerAccessTokenCreate } } = await config.fetch(query, { variables })

    throwUserErrors(customerAccessTokenCreate?.customerUserErrors)

    const customerAccessToken = customerAccessTokenCreate?.customerAccessToken
    const accessToken = customerAccessToken?.accessToken

    // if (accessToken) {
    //   setCustomerToken(accessToken)
    // }

    return {
      result: customerAccessToken?.accessToken,
    }
  }

  return login
}
