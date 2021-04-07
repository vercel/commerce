import type { Product } from '@commerce/types'
import { AquilacmsConfig, getConfig } from '../api'
import { normalizeProduct } from '../lib/normalize'

const FIELDS = [
  'products',
  'featuredProducts',
  'bestSellingProducts',
  'newestProducts',
]

export type ProductTypes =
  | 'products'
  | 'featuredProducts'
  | 'bestSellingProducts'
  | 'newestProducts'

export type ProductVariables = { field?: ProductTypes; first?: number } & {
  locale?: string
  hasLocale?: boolean
}

async function getAllProducts({
  variables: { field = 'products', ...vars } = {},
  config,
}: {
  query?: string
  variables?: ProductVariables
  config?: AquilacmsConfig
  preview?: boolean
} = {}): Promise<{ products: Product[] | any[] }> {
  config = getConfig(config)

  const locale = (vars.locale || config.locale)?.split('-')[0]
  const variables = {
    ...vars,
    locale,
    hasLocale: !!locale,
  }

  if (!FIELDS.includes(field)) {
    throw new Error(
      `The field variable has to match one of ${FIELDS.join(', ')}`
    )
  }

  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  let { datas } = await config.storeApiFetch('/v2/products', {
    method: 'POST',
    body: JSON.stringify({
      lang: locale,
      PostBody: {
        filter: {
          kind: 'SimpleProduct',
        },
        structure: {
          code: 1,
          id: 1,
          translation: 1,
          attributes: 1,
          pictos: 1,
          canonical: 1,
          images: 1,
        },
        page: 1,
        limit: variables.first,
      },
    }),
  })

  const products = datas.map(normalizeProduct)

  return { products }
}

export default getAllProducts
