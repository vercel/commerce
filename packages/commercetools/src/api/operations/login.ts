import type { ServerResponse } from 'http'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { LoginOperation } from '../../types/login'
import { Provider, CommercetoolsConfig } from '..'
import {
  ClientResponse,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk'
import { removeCustomerCookie, setCustomerId } from '../../utils'

export default function loginOperation({
  commerce,
}: OperationContext<Provider>) {
  async function login<T extends LoginOperation>({
    variables,
    config: cfg,
    res,
  }: {
    variables: T['variables']
    res: ServerResponse
    config?: CommercetoolsConfig
  }): Promise<T['data']> {
    const { email, password, cartId } = variables as any
    const config = commerce.getConfig(cfg)
    const response = await config.sdkFetch<
      ClientResponse<CustomerSignInResult>,
      CustomerSignin
    >({
      query: 'login',
      method: 'post',
      body: {
        email,
        password,
        ...(cartId
          ? {
              anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
              anonymousCart: {
                typeId: 'cart',
                id: cartId,
              },
            }
          : {}),
      },
    })
    if (response.body?.customer?.id) {
      setCustomerId(res, response.body.customer.id)
      return { result: response.body.customer.id }
    } else {
      removeCustomerCookie(res)
      return { result: undefined }
    }
  }

  return login
}
