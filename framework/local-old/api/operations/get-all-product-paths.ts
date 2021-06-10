import type { LocalConfig, Provider } from '..'
import type { OperationContext } from '@commerce/api/operations'
import { GetAllProductPathsOperation } from '../../types/product'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query,
    config,
    variables,
  }: {
    query?: string
    config?: LocalConfig
    variables?: T['variables']
  } = {}): Promise<T['data']> {
    return {
      products: [
        {
          path: `/hank`,
        },
      ],
    }
  }

  return getAllProductPaths
}
