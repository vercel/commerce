import type { GetCustomerIdQuery } from '../../../schema'
import type { BigcommerceConfig } from '../'

export const getCustomerIdQuery = /* GraphQL */ `
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
  config: BigcommerceConfig
}): Promise<string | undefined> {
  const { data } = await config.fetch<GetCustomerIdQuery>(
    getCustomerIdQuery,
    undefined,
    {
      'Set-Cookie': `${config.customerCookie}=${customerToken}`,
    }
  )

  return String(data?.customer?.entityId)
}

export default getCustomerId
