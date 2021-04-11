import { Product } from '@commerce/types'
import { Customer } from '@commerce/types'
import { fileURLToPath } from 'node:url'

import {
  Product as ShopifyProduct,
  Checkout,
  CheckoutLineItemEdge,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  MoneyV2,
  ProductOption,
} from '../schema'

import type { Cart, LineItem, SwellCustomer, SwellProduct } from '../types'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

const normalizeProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => {
  let returnValues = values.map((value) => {
    let output: any = {
      label: value.name,
    }
    if (displayName === 'Color') {
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

type SwellImage = {
  file: {
    url: String
    height: Number
    width: Number
  }
  id: string
}
const normalizeProductImages = (images) => {
  if (!images) {
    return [{ url: '/' }]
  }
  return images?.map(({ file, ...rest }: SwellImage) => ({
    url: file?.url,
    height: file?.height,
    width: file?.width,
    ...rest,
  }))
}

const normalizeProductVariants = (variants) => {
  return variants?.map(({ id, name, values, price, sku }) => ({
    id,
    name,
    sku: sku ?? id,
    price: price ?? null,
    listPrice: price ?? null,
    // requiresShipping: true,
    options: values.map(({ name, value }: SelectedOption) =>
      normalizeProductOption({
        id,
        name,
        values: value ? [value] : [],
      })
    ),
  }))
}

export function normalizeProduct(productNode: SwellProduct): Product {
  const { images, options, slug, price } = productNode

  const productOptions = options.map((o) => normalizeProductOption(o))
  const productVariants = normalizeProductVariants(
    options.filter((option) => option.variant)
  )
  const productImages = normalizeProductImages(images)

  const product = {
    ...productNode,
    vendor: 'our brands',
    path: `/${slug}`,
    images: productImages ?? [],
    variants: productVariants,
    options: productOptions,
  }

  return product
}

export function normalizeCart(cart: Checkout): Cart {
  return {
    id: cart.id,
    customerId: cart.account_id,
    email: '',
    createdAt: cart.date_created,
    currency: cart.currency,
    taxesIncluded: cart.tax_included_total,
    lineItems: cart.items?.map(normalizeLineItem),
    lineItemsSubtotalPrice: +cart.sub_total,
    subtotalPrice: +cart.sub_total,
    totalPrice: cart.grand_total,
    discounts: cart.discounts,
  }
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
}: CheckoutLineItemEdge): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(product?.id),
    name: product.name,
    quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.name!,
      image: {
        url: product.images ? product?.images[0].file.url : '',
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
}
