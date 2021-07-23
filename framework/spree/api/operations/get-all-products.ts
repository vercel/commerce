import { Product } from '@commerce/types/product'
import { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { LocalConfig, Provider, SpreeApiProvider } from '../index'
import type { IProducts } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
// import data from '../../../local/data.json'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = 'products.list',
    variables = { first: 10 },
    config: userConfig,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
  } = {}): Promise<{ products: Product[] | any[] }> {
    const config = commerce.getConfig(userConfig)
    const { fetch: apiFetch /*, locale*/ } = config
    const first = variables.first // How many products to fetch.

    console.log(
      'sdfuasdufahsdf variables = ',
      variables,
      'query = ',
      query,
      'config = ',
      config
    )

    console.log('sdfasdg')

    const { data } = await apiFetch<IProducts>(
      query,
      { variables }
      // {
      //   ...(locale && {}),
      // }
    )

    console.log('asuidfhasdf', data)

    // return {
    //   products: data.products.edges.map(({ node }) =>
    //     normalizeProduct(node as ShopifyProduct)
    //   ),
    // }

    const normalizedProducts: Product[] = data.data.map((spreeProduct) => {
      return {
        id: spreeProduct.id,
        name: spreeProduct.attributes.name,
        description: spreeProduct.attributes.description,
        images: [],
        variants: [],
        options: [],
        price: {
          value: 10,
          currencyCode: 'USD',
          retailPrice: 8,
          salePrice: 7,
          listPrice: 6,
          extendedSalePrice: 2,
          extendedListPrice: 1,
        },
      }
    })

    return {
      // products: data.products,
      // TODO: Return Spree products.
      products: normalizedProducts,
    }
  }

  return getAllProducts
}
