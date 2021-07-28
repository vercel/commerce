import { Product } from '@commerce/types/product'
import { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { ElasticpathConfig, Provider } from '../index'
import { gateway as MoltinGateway } from '@moltin/sdk'
import data from '../../data.json'

const Moltin = MoltinGateway({
  client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
})

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<ElasticpathConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    //elastic path get all products
    let products = await Moltin.Products.Limit(200).All();
    console.log("All products", products);
    return {
      products: data.products,
    }
  }
  return getAllProducts
}
