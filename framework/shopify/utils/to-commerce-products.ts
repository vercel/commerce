import {
  Product as ShopifyProduct,
  ImageEdge,
  SelectedOption,
  ProductEdge,
  ProductVariantEdge,
  MoneyV2,
  ProductOption,
} from '../schema'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

const tranformProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => ({
  __typename: 'MultipleChoiceOption',
  displayName,
  values: values.map((value) => ({
    label: value,
  })),
})

const transformImages = (images: ImageEdge[]) =>
  images.map(({ node: { src: url } }) => ({
    url,
  }))

export const toCommerceProduct = (product: ShopifyProduct) => {
  const {
    id,
    title: name,
    vendor,
    images: { edges: images },
    variants: { edges: variants },
    description,
    handle: slug,
    priceRange,
    options,
  } = product

  return {
    id,
    name,
    slug,
    vendor,
    description,
    path: `/${slug}`,
    price: money(priceRange.minVariantPrice),
    images: transformImages(images),
    variants: variants.map(
      ({ node: { id, selectedOptions } }: ProductVariantEdge) => {
        return {
          id,
          options: selectedOptions.map(({ name, value }: SelectedOption) =>
            tranformProductOption({
              id,
              name,
              values: [value],
            } as ProductOption)
          ),
        }
      }
    ),
    options: options.map((option: ProductOption) =>
      tranformProductOption(option)
    ),
  }
}

export default function toCommerceProducts(products: ProductEdge[]) {
  return products.map(
    ({
      node: {
        id,
        title: name,
        images: { edges: images },
        handle: slug,
        priceRange,
      },
    }: ProductEdge) => ({
      id,
      name,
      images: transformImages(images),
      price: money(priceRange.minVariantPrice),
      slug,
      path: `/${slug}`,
    })
  )
}
