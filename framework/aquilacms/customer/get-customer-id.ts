import { AquilacmsConfig, getConfig } from '../api'
import { AquilacmsUser } from '../types'

async function getCustomerId({
  customerToken,
  config,
}: {
  customerToken: string
  config?: AquilacmsConfig
}): Promise<string | undefined> {
  config = getConfig(config)
  const data: AquilacmsUser = await config.storeApiFetch('/v2/user', {
    method: 'POST',
    body: JSON.stringify({
      PostBody: {},
    }),
    headers: {
      authorization: customerToken,
    },
  })

  return data._id
}

export default getCustomerId
