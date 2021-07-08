import { getConfig, ReactionCommerceConfig } from '../api'
import getViewerIdQuery from '../utils/queries/get-viewer-id-query'

async function getViewerId({
  customerToken: customerAccessToken,
  config,
}: {
  customerToken: string
  config?: ReactionCommerceConfig
}): Promise<number | undefined> {
  config = getConfig(config)

  const { data } = await config.fetch(
    getViewerIdQuery,
    {},
    {
      headers: {
        Authorization: `Bearer ${customerAccessToken}`,
      },
    }
  )

  return data.viewer?._id
}

export default getViewerId
