import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetAllProductPathsOperation } from '@vercel/commerce/types/product'
import type { CommercejsConfig, Provider } from '..'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    config,
  }: {
    config?: Partial<CommercejsConfig>
  } = {}): Promise<T['data']> {
    const { sdkFetch } = commerce.getConfig(config)
    const { data } = await sdkFetch('products', 'list')

    // Match a path for every product retrieved
    const productPaths = data.map(({ permalink }: { permalink: string }) => ({
      path: `/${permalink}`,
    }))

    return {
      products: productPaths,
    }
  }

  return getAllProductPaths
}
