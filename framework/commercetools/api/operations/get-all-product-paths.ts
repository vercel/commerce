import { OperationContext, OperationOptions } from '@commerce/api/operations'
import { GetAllProductPathsOperation } from '@commerce/types/product'
import { CommercetoolsConfig, Provider } from '@framework/api'

export type GetAllProductPathsResult = {
  products: Array<{ node: { path: string } }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<
    T extends GetAllProductPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: CommercetoolsConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: CommercetoolsConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: CommercetoolsConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const data: any = await config.fetchProducts(query)
    const paths = data.body.results.map((prod: any) => ({
      // TODO: TEC-264: Handle the locale properly
      path: `/${prod.slug.en}`,
    }))

    return {
      products: paths,
    }
  }

  return getAllProductPaths
}
