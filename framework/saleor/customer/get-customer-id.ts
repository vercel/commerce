import { getConfig, SaleorConfig } from '../api'
import { getCustomerIdQuery } from '../utils/queries'
import Cookies from 'js-cookie'

async function getCustomerId({
  customerToken: customerAccesToken,
  config,
}: {
  customerToken: string
  config?: SaleorConfig
}): Promise<number | undefined> {
  config = getConfig(config)

  const { data } = await config.fetch(getCustomerIdQuery, {
    variables: {
      customerAccesToken:
        customerAccesToken || Cookies.get(config.customerCookie),
    },
  })

  return data.customer?.id
}

export default getCustomerId
