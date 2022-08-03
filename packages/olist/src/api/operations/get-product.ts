import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetProductOperation } from '@vercel/commerce/types/product'

import type { OlistConfig, Provider } from '..'

import {
  mapItemRawToCommerceResponse,
  extractProductId,
  mapImagesRawToCommerceResponse,
  mapVariantsRawToCommerceResponse,
  mapVariantsOptionsToCommerceCommerce,
} from '../../utils/product'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    config,
    variables,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<OlistConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { service } = commerce.getConfig(config)

    const productId = extractProductId(variables?.slug || variables?.path)

    const productPromise = service.product.getById(Number(productId))
    const variantsPromise = service.variant.list(Number(productId))
    const imagesPromise = service.product.image.list(Number(productId))

    const [product, images, variants] = await Promise.all([
      productPromise,
      imagesPromise,
      variantsPromise,
    ])

    return {
      product: {
        ...mapItemRawToCommerceResponse(product),
        images: mapImagesRawToCommerceResponse(images),
        variants: mapVariantsRawToCommerceResponse(variants),
        options: mapVariantsOptionsToCommerceCommerce(variants),
      },
    }
  }

  return getProduct
}
