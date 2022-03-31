import { ShopifyConfig } from '../api'
import { getCustomerIdQuery } from './queries'
import type {
  GetCustomerIdQuery,
  GetCustomerQueryVariables,
} from '../../schema'

export type customerId = {
  id: string
}

const getCustomerId = async ({
  config,
  customerToken,
}: {
  config: ShopifyConfig
  customerToken: string
}): Promise<string | undefined | null> => {
  const { data } = await config.fetch<
    GetCustomerIdQuery,
    GetCustomerQueryVariables
  >(getCustomerIdQuery, {
    variables: {
      customerAccessToken: customerToken,
    },
  })

  return String(data.customer?.id)
}

export default getCustomerId
