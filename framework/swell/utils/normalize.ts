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
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value.name,
      }
      if (displayName === 'Color') {
        output = {
          ...output,
          hexColors: [value],
        }
      }
      return output
    }),
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
    height: file.height,
    width: file.width,
    ...rest,
  }))
}

const normalizeProductVariants = (variants) => {
  return variants?.map(({ id, name, values, price, stock_status }) => ({
    id,
    name,
    sku: sku ?? id,
    price,
    listPrice: price,
    // requiresShipping: true,
    options: values.map(({ name, value }: SelectedOption) =>
      normalizeProductOption({
        id,
        name,
        values: [value],
      })
    ),
  }))
}

export function normalizeProduct(productNode: SwellProduct): Product {
  const {
    id,
    name,
    vendor,
    images,
    variants,
    description,
    slug,
    price,
    options,
    ...rest
  } = productNode

  const product = {
    id,
    name,
    vendor: 'our brands',
    description,
    path: `/${slug}`,
    slug,
    price,
    images: normalizeProductImages(images),
    variants: [], //variants ? normalizeProductVariants(options) : [],
    options: options ? options.map((o) => normalizeProductOption(o)) : [],
    ...rest,
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
        url: product?.images[0].file.url,
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
