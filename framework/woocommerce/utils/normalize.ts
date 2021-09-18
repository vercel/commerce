import type { Product, ProductImage } from '../types/product'

import { SimpleProduct, ProductToMediaItemConnection } from '../schema'

const normalizeProductImages = ({
  edges,
}: ProductToMediaItemConnection): ProductImage[] => {
  const edges_ =
    edges
      ?.filter((edge) => edge?.node)
      .map(({ node }) => {
        return {
          url: node.sourceUrl,
          alt: node.altText ?? node.title,
        }
      }) ?? []

  return edges_
}

export function normalizeProduct({
  id,
  name,
  sku,
  description,
  shortDescription,
  slug,
  image,
  galleryImages,
  price,
  ...rest
}: SimpleProduct): Product {
  const images: ProductToMediaItemConnection = galleryImages ?? { edges: [] }

  if (image) {
    images.edges?.push({ node: image })
  }

  const product = {
    id,
    options: [],
    variants: [],
    name: name ?? id,
    sku: sku ?? 'sku',
    path: slug ?? id,
    slug: slug?.replace(/^\/+|\/+$/g, ''),
    images: normalizeProductImages(images),
    price: { value: 0, currencyCode: 'USD' },
    description: description ?? shortDescription ?? '',
    descriptionHtml: description ?? shortDescription ?? '',
  }

  if (price) {
    product.price.value = Number(price.substring(1))
  }

  return product
}
