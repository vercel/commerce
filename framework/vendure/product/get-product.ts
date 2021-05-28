import { Product } from '@commerce/types'
import { getConfig, VendureConfig } from '../api'
import { GetProductQuery } from '../schema'
import { getProductQuery } from '../lib/queries/get-product-query'

async function getProduct({
  query = getProductQuery,
  variables,
  config,
}: {
  query?: string
  variables: { slug: string }
  config?: VendureConfig
  preview?: boolean
}): Promise<Product | {} | any> {
  config = getConfig(config)

  const locale = config.locale
  const { data } = await config.fetch<GetProductQuery>(query, { variables })
  const product = data.product

  if (product) {
    return {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        slug: product.slug,
        images: product.assets.map((a) => ({
          url: a.preview,
          alt: a.name,
        })),
        variants: product.variants.map((v) => ({
          id: v.id,
          options: v.options.map((o) => ({
            id: o.id,
            displayName: o.name,
            values: o.group.options.map((_o) => ({ label: _o.name })),
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

export default getProduct
