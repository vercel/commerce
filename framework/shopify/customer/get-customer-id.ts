import { getConfig, ShopifyConfig } from '../api'
import getCustomerIdQuery from '../utils/queries/get-customer-id-query'
import Cookies from 'js-cookie'
import { GetCustomerIdQuery } from '../schema'

async function getCustomerId({
  customerToken: customerAccesToken,
  config,
}: {
  customerToken: string
  config?: ShopifyConfig
}): Promise<string | undefined> {
  config = getConfig(config)

  const {
    data: { customer },
  } = await config.fetch<GetCustomerIdQuery>(getCustomerIdQuery, {
    variables: {
      customerAccesToken:
        customerAccesToken || Cookies.get(config.customerCookie),
    },
  })

  return customer?.id
}

export default getCustomerId
