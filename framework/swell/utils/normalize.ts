import { Product, Customer } from '@commerce/types'

import { MoneyV2, ProductOption } from '../schema'

import type {
  Cart,
  CartLineItem,
  SwellCustomer,
  SwellProduct,
  SwellImage,
  SwellVariant,
  ProductOptionValue,
  SwellCart,
  LineItem,
} from '../types'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

type normalizedProductOption = {
  __typename?: string
  id: string
  displayName: string
  values: ProductOptionValue[]
}

const normalizeProductOption = ({
  id,
  name: displayName = '',
  values = [],
}: ProductOption) => {
  let returnValues = values.map((value) => {
    let output: any = {
      label: value.name,
      id: value?.id || id,
    }
    if (displayName.match(/colou?r/gi)) {
      output = {
        ...output,
        hexColors: [value.name],
      }
    }
    return output
  })
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: returnValues,
  }
}

const normalizeProductImages = (images: SwellImage[]) => {
  if (!images || images.length < 1) {
    return [{ url: '/' }]
  }
  return images?.map(({ file, ...rest }: SwellImage) => ({
    url: file?.url + '',
    height: Number(file?.height),
    width: Number(file?.width),
    ...rest,
  }))
}

const normalizeProductVariants = (
  variants: SwellVariant[],
  productOptions: normalizedProductOption[]
) => {
  return variants?.map(
    ({ id, name, price, option_value_ids: optionValueIds = [] }) => {
      const values = name
        .split(',')
        .map((i) => ({ name: i.trim(), label: i.trim() }))

      const options = optionValueIds.map((id) => {
        const matchingOption = productOptions.find((option) => {
          return option.values.find(
            (value: ProductOptionValue) => value.id == id
          )
        })
        return normalizeProductOption({
          id,
          name: matchingOption?.displayName ?? '',
          values,
        })
      })

      return {
        id,
        name,
        // sku: sku ?? id,
        price: price ?? null,
        listPrice: price ?? null,
        // requiresShipping: true,
        options,
      }
    }
  )
}

export function normalizeProduct(swellProduct: SwellProduct): Product {
  const {
    id,
    name,
    description,
    images,
    options,
    slug,
    variants,
    price: value,
    currency: currencyCode,
  } = swellProduct
  // ProductView accesses variants for each product
  const emptyVariants = [{ options: [], id, name }]
  const productOptions = options
    ? options.map((o) => normalizeProductOption(o))
    : []
  const productVariants = variants
    ? normalizeProductVariants(variants, productOptions)
    : []

  const productImages = normalizeProductImages(images)
  const product = {
    ...swellProduct,
    description,
    id,
    vendor: '',
    path: `/${slug}`,
    images: productImages,
    variants:
      productVariants && productVariants.length
        ? productVariants
        : emptyVariants,
    options: productOptions,
    price: {
      value,
      currencyCode,
    },
  }
  return product
}

export function normalizeCart({
  id,
  account_id,
  date_created,
  currency,
  tax_included_total,
  items,
  sub_total,
  grand_total,
  discounts,
}: SwellCart) {
  const cart: Cart = {
    id: id,
    customerId: account_id + '',
    email: '',
    createdAt: date_created,
    currency: { code: currency },
    taxesIncluded: tax_included_total > 0,
    lineItems: items?.map(normalizeLineItem) ?? [],
    lineItemsSubtotalPrice: +sub_total,
    subtotalPrice: +sub_total,
    totalPrice: grand_total,
    discounts: discounts?.map((discount) => ({ value: discount.amount })),
  }
  return cart
}

export function normalizeCustomer(customer: SwellCustomer): Customer {
  const { first_name: firstName, last_name: lastName } = customer
  return {
    ...customer,
    firstName,
    lastName,
  }
}

function normalizeLineItem({
  id,
  product,
  price,
  variant,
  quantity,
}: CartLineItem): LineItem {
  const item = {
    id,
    variantId: variant?.id,
    productId: product.id ?? '',
    name: product?.name ?? '',
    quantity,
    variant: {
      id: variant?.id ?? '',
      sku: variant?.sku ?? '',
      name: variant?.name!,
      image: {
        url:
          product?.images && product.images.length > 0
            ? product?.images[0].file.url
            : '/',
      },
      requiresShipping: false,
      price: price,
      listPrice: price,
    },
    path: '',
    discounts: [],
    options: [
      {
        value: variant?.name,
      },
    ],
  }
  return item
}
