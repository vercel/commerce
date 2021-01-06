import type { GetProductQuery, GetProductQueryVariables } from '../../schema'
import setProductLocaleMeta from '../utils/set-product-locale-meta'
import { productInfoFragment } from '../fragments/product'
import { BigcommerceConfig, getConfig } from '..'

export const getProductQuery = /* GraphQL */ `
  query getProduct(
    $hasLocale: Boolean = false
    $locale: String = "null"
    $path: String!
  ) {
    site {
      route(path: $path) {
        node {
          __typename
          ... on Product {
            ...productInfo
            variants {
              edges {
                node {
                  entityId
                  defaultImage {
                    urlOriginal
                    altText
                    isDefault
                  }
                  prices {
                    ...productPrices
                  }
                  inventory {
                    aggregated {
                      availableToSell
                      warningLevel
                    }
                    isInStock
                  }
                  productOptions {
                    edges {
                      node {
                        __typename
                        entityId
                        displayName
                        ...multipleChoiceOption
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ${productInfoFragment}
`

export type ProductNode = Extract<
  GetProductQuery['site']['route']['node'],
  { __typename: 'Product' }
>

export type GetProductResult<
  T extends { product?: any } = { product?: ProductNode }
> = T

export type ProductVariables = { locale?: string } & (
  | { path: string; slug?: never }
  | { path?: never; slug: string }
)

async function getProduct(opts: {
  variables: ProductVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetProductResult>

async function getProduct<T extends { product?: any }, V = any>(opts: {
  query: string
  variables: V
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetProductResult<T>>

async function getProduct({
  query = getProductQuery,
  variables: { slug, ...vars },
  config,
}: {
  query?: string
  variables: ProductVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetProductResult> {
  config = getConfig(config)

  const locale = vars.locale || config.locale
  const variables: GetProductQueryVariables = {
    ...vars,
    locale,
    hasLocale: !!locale,
    path: slug ? `/${slug}/` : vars.path!,
  }
  const { data } = await config.fetch<GetProductQuery>(query, { variables })
  const product = data.site?.route?.node

  if (product?.__typename === 'Product') {
    if (locale && config.applyLocale) {
      setProductLocaleMeta(product)
    }
    return { product }
  }

  return {}
}

export default getProduct
