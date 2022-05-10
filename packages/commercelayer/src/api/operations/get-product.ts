import type { CommercelayerConfig } from '../index'
import { Product } from '@vercel/commerce/types/product'
import { GetProductOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import { getSalesChannelToken } from '@commercelayer/js-auth'
import { CommerceLayerStatic } from '@commercelayer/sdk'
import { getOrganizationSlug } from '../utils/getCredentials'
import getPrices from '../utils/getPrices'
import getContentData from '../utils/getContentData'

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<CommercelayerConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    const endpoint = process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT as string
    const clientId = process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID as string
    const scope = process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE as string
    if ([!endpoint, !clientId, !scope].every(Boolean)) {
      throw new Error('Missing commercelayer endpoint, client ID or scope')
    }
    const credentials = await getSalesChannelToken({
      endpoint,
      clientId,
      scope,
    })
    const organization = getOrganizationSlug(endpoint).organization
    const sdk = CommerceLayerStatic.init({
      accessToken: credentials.accessToken,
      organization,
    })
    const contentData = await getContentData()
    const products = await getPrices({ products: contentData, sdk })
    const product = products.find(({ slug }) => slug === variables?.slug)
    return {
      product,
    }
  }

  return getProduct
}
