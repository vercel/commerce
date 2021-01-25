import { getConfig, VendureConfig } from '../api'

export const getProductQuery = /* GraphQL */ `
  query getProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      assets {
        id
        preview
        name
      }
      variants {
        id
        priceWithTax
        currencyCode
        options {
          id
          name
          code
          groupId
        }
      }
      optionGroups {
        code
        name
        options {
          name
        }
      }
    }
  }
`

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
  const { data } = await config.fetch(query, { variables })
  const product = data.product

  if (product) {
    return {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        slug: product.slug,
        images: product.assets.map((a: any) => ({
          url: a.preview,
          alt: a.name,
        })),
        variants: product.variants.map((v: any) => ({
          id: v.id,
          options: v.options.map((o: any) => ({
            displayName: o.name,
            values: [],
          })),
        })),
        price: {
          value: product.variants[0].priceWithTax / 100,
          currencyCode: product.variants[0].currencyCode,
        },
        options: product.optionGroups.map((og: any) => ({
          displayName: og.name,
          values: og.options.map((o: any) => ({ label: o.name })),
        })),
      },
    }
  }

  return {}
}

export default getProduct
