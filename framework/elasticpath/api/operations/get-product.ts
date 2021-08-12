import type { ElasticpathConfig } from '../index'
import { Product } from '@commerce/types/product'
import { GetProductOperation } from '@commerce/types/product'
import data from '../../data.json'
import type { OperationContext } from '@commerce/api/operations'
import { gateway as MoltinGateway } from '@moltin/sdk'
import normalizeProduct from '../../utils/normalize'

const Moltin = MoltinGateway({
  client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
})

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
    config?: Partial<ElasticpathConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    let variablesS = ''
    if (typeof variables?.slug == "undefined") {
      variablesS = ''
    } else {
      variablesS = variables.slug;
    }
    let products = await Moltin.Products.Filter({
      eq: {
        slug: variablesS 
      }
    }).All();
    let normalizeProducts = await normalizeProduct(products.data)
    let productSlugs = normalizeProducts.find(({ slug }) => slug === variables!.slug);
    return {
      // product: data.products.find(({ slug }) => slug === variables!.slug),
      product: productSlugs
    }
  }

  return getProduct
}
