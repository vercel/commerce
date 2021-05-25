import { AquilacmsConfig, getConfig } from '../api'
import { normalizeProduct } from '../lib/normalize'
import type { Product } from '@commerce/types'
import { AquilacmsProduct } from '../types'

export type ProductVariables = { locale?: string } & (
  | { path: string; slug?: never }
  | { path?: never; slug: string }
)

export type GetProductResult<
  T extends { product?: any } = { product?: Product }
> = T

async function getProduct({
  variables: { slug, ...vars },
  config,
}: {
  query?: string
  variables: ProductVariables
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<Product | any> {
  config = getConfig(config)
  const locale = (vars.locale || config.locale)?.split('-')[0]
  const data: AquilacmsProduct = await config.storeApiFetch('/v2/product', {
    method: 'POST',
    body: JSON.stringify({
      lang: locale,
      countviews: true,
      withFilters: false,
      PostBody: {
        filter: {
          [`translation.${locale}.slug`]: slug,
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
      },
    }),
  })
  return { product: normalizeProduct(data) }
}

export default getProduct
