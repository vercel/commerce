import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetProductOperation } from '@vercel/commerce/types/product'
import type { GetProductQuery, GetProductQueryVariables } from '../../../schema'
import setProductLocaleMeta from '../utils/set-product-locale-meta'
import { productInfoFragment } from '../fragments/product'
import { BigcommerceConfig, Provider } from '..'
import { normalizeProduct } from '../../lib/normalize'

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
            variants(first: 250) {
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

// TODO: See if this type is useful for defining the Product type
// export type ProductNode = Extract<
//   GetProductQuery['site']['route']['node'],
//   { __typename: 'Product' }
// >

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>(opts: {
    variables: T['variables']
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<BigcommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>({
    query = getProductQuery,
    variables: { slug, ...vars },
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    const { locale } = config
    const variables: GetProductQueryVariables = {
      locale,
      hasLocale: !!locale,
      path: slug ? `/${slug}` : vars.path!,
    }
    const { data } = await config.fetch<GetProductQuery>(query, { variables })
    const product = data.site?.route?.node

    if (product?.__typename === 'Product') {
      if (locale && config.applyLocale) {
        setProductLocaleMeta(product)
      }

      return { product: normalizeProduct(product as any) }
    }

    return {}
  }
  return getProduct
}
