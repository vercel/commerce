// TODO: Fix the types in this file
// import { Product, Image } from '../types'

type Product = any
type Image = any

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
      // TODO: Fix the variant type
      variants: product.variants.map((variant: any) => {
        return {
          id: variant.id,
          // TODO: Fix the selectedOption type
          options: variant.selectedOptions.map((selectedOption: any) => {
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
      // TODO: Fix the option type
      productOptions: product.options.map((option: any) => {
        return {
          __typename: 'MultipleChoiceOption',
          displayName: option.name,
          // TODO: Fix the value type
          values: option.values.map((value: any) => {
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
