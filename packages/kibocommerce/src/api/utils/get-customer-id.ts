import type { KiboCommerceConfig } from '..'
import { getCustomerAccountQuery } from '../queries/get-customer-account-query'

async function getCustomerId({
  customerToken,
  config,
}: {
  customerToken: string
  config: KiboCommerceConfig
}): Promise<string | undefined> {
  const token = customerToken
    ? Buffer.from(customerToken, 'base64').toString('ascii')
    : null
  const accessToken = token ? JSON.parse(token).accessToken : null
  const { data } = await config.fetch(getCustomerAccountQuery, undefined, {
    'x-vol-user-claims': accessToken,
  })

  return data?.customerAccount?.id
}

export default getCustomerId
