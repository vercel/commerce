import { Product, Image } from '../types'

export default function toCommerceProducts(products: Product[]) {
  return products.map((product: Product) => {
    return {
      id: product.id,
      entityId: product.id,
      name: product.title,
      slug: product.handle,
      title: product.title,
      vendor: product.vendor,
      description: product.descriptionHtml,
      path: `/${product.handle}`,
      price: {
        value: +product.variants[0].price,
        currencyCode: 'USD', // TODO
      },
      images: product.images.map((image: Image) => {
        return {
          url: image.src,
        }
      }),
      variants: product.variants.map((variant) => {
        return {
          id: variant.id,
          options: variant.selectedOptions.map((selectedOption) => {
            return {
              __typename: 'MultipleChoiceOption',
              displayName: selectedOption.name,
              values: [
                {
                  node: {
                    id: variant.id,
                    label: selectedOption.value,
                  },
                },
              ],
            }
          }),
        }
      }),
      productOptions: product.options.map((option) => {
        return {
          __typename: 'MultipleChoiceOption',
          displayName: option.name,
          values: option.values.map((value) => {
            return {
              node: {
                entityId: 1,
                label: value.value,
                hexColors: [value.value],
              },
            }
          }),
        }
      }),
      options: [],
    }
  })
}
