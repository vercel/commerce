import type { KiboCommerceConfig } from '../'
import { getAnonymousShopperTokenQuery } from '../queries/get-anonymous-shopper-token-query'

async function getAnonymousShopperToken({
  config,
}: {
  config: KiboCommerceConfig
}): Promise<string | undefined> {
  const { data } = await config.fetch(getAnonymousShopperTokenQuery)
  return data?.getAnonymousShopperToken
}

export default getAnonymousShopperToken
