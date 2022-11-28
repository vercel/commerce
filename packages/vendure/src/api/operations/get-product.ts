import type {
  Product,
  GetProductOperation,
} from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Provider, VendureConfig } from '../'

import type { GetProductQuery } from '../../../schema'
import { getProductQuery } from '../../utils/queries/get-product-query'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const locale = config.locale
    const { data } = await config.fetch<GetProductQuery>(query, { variables })
    const product = data.product

    if (product) {
      const getOptionGroupName = (id: string): string => {
        return product.optionGroups.find((og) => og.id === id)!.name
      }
      return {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          slug: product.slug,
          path: `/${product.slug}`,
          images: product.assets.map((a) => ({
            url: a.preview,
            alt: a.name,
          })),
          variants: product.variants.map((v) => ({
            id: v.id,
            options: v.options.map((o) => ({
              // This __typename property is required in order for the correct
              // variant selection to work, see `components/product/helpers.ts`
              // `getVariant()` function.
              __typename: 'MultipleChoiceOption',
              id: o.id,
              displayName: getOptionGroupName(o.groupId),
              values: [{ label: o.name }],
            })),
          })),
          price: {
            value: product.variants[0].priceWithTax / 100,
            currencyCode: product.variants[0].currencyCode,
          },
          options: product.optionGroups.map((og) => ({
            id: og.id,
            displayName: og.name,
            values: og.options.map((o) => ({ label: o.name })),
          })),
        } as Product,
      }
    }

    return {}
  }

  return getProduct
}
