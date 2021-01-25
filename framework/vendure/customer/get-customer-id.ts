import { GetCustomerIdQuery } from '../schema'
import { VendureConfig, getConfig } from '../api'

export const getCustomerIdQuery = /* */ `
  query getCustomerId {
    customer {
      entityId
    }
  }
`

async function getCustomerId({
  customerToken,
  config,
}: {
  customerToken: string
  config?: VendureConfig
}): Promise<number | undefined> {
  config = getConfig(config)

  const { data } = await config.fetch<GetCustomerIdQuery>(
    getCustomerIdQuery,
    undefined,
    {
      headers: {
        cookie: `${config.customerCookie}=${customerToken}`,
      },
    }
  )

  return data?.customer?.entityId
}

export default getCustomerId
