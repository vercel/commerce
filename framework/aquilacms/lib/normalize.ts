import type { Product, ProductOption } from '@commerce/types'
import type {
  Cart,
  AquilacmsCart,
  LineItem,
  AquilacmsItem,
  AquilacmsProduct,
  AquilacmsProductImage,
  AquilacmsUser,
  User,
  AquilacmsProductAttribute,
  AquilacmsOrder,
  Order,
} from '../types'

function normalizeProductOption(
  productOption: AquilacmsProductAttribute
): ProductOption {
  if (productOption.type === 'color') {
    return {
      id: productOption.id,
      displayName: productOption.name,
      values: [
        {
          label: productOption.value,
          hexColors: [productOption.value],
        },
      ],
    }
  } else if (productOption.type === 'multiselect') {
    return {
      id: productOption.id,
      displayName: productOption.name,
      values: productOption.values.map((opt) => ({ label: opt })),
    }
  } else {
    return {
      id: productOption.id,
      displayName: productOption.name,
      values: [],
    }
  }
}

export function normalizeProductImage(image: AquilacmsProductImage) {
  return {
    url: `${process.env.AQUILACMS_URL}/${image.url}`,
    alt: image.alt,
  }
}

export function normalizeProduct(productNode: AquilacmsProduct): Product {
  return {
    id: productNode._id,
    name: productNode.name,
    description: productNode.description1?.text ?? '',
    slug: productNode.slug['en'],
    images: productNode.images.map(normalizeProductImage),
    variants: [
      {
        id: productNode._id,
        options:
          [] ??
          productNode.attributes
            .filter(
              (attr) => ['color', 'multiselect'].indexOf(attr.type) !== -1
            )
            .map(normalizeProductOption),
      },
    ],
    price: {
      currencyCode: 'EUR',
      value: productNode.price.ati.special ?? productNode.price.ati.normal,
    },
    options: [] ?? productNode.attributes.map(normalizeProductOption),
  }
}

export function normalizeCart(data: AquilacmsCart): Cart {
  const lineItems = data.items.map(normalizeLineItem)
  // TODO: not good, need to change
  const price = lineItems.reduce((total, item) => total + item.variant.price, 0)
  return {
    id: data._id,
    customerId: data.customer?.id,
    email: data.customer?.email,
    createdAt: data.createdAt,
    currency: { code: 'EUR' },
    taxesIncluded: true,
    lineItems,
    lineItemsSubtotalPrice: price,
    subtotalPrice: data.priceSubTotal.ati,
    totalPrice: data.priceTotal.ati,
    discounts: [],
  }
}

function normalizeLineItem(item: AquilacmsItem): LineItem {
  const image = item.id.images.find((i: any) => i.default)
  return {
    id: item._id,
    variantId: item.id._id,
    productId: item.id._id,
    name: item.name,
    quantity: item.quantity,
    variant: {
      id: item.id._id,
      sku: item.code,
      name: item.name,
      image: {
        url: `${process.env.AQUILACMS_URL}/${image?.url}`,
        altText: image?.alt,
      },
      requiresShipping: true,
      price: item.price?.special?.ati ?? item.price.unit.ati,
      listPrice: item.price?.special?.ati ?? item.price.unit.ati,
    },
    path: `${item.id.slug['en']}`,
    discounts: [],
  }
}

export function normalizeUser(data: AquilacmsUser): User {
  return {
    entityId: data._id,
    firstName: data.firstname,
    lastName: data.lastname,
    email: data.email,
    company: data?.company?.name,
    customerGroupId: '',
    notes: '',
    phone:
      data?.addresses?.[data?.delivery_address].phone ||
      data?.addresses?.[data?.delivery_address].phone_mobile,
    addressCount: data?.addresses?.length,
    attributeCount: 0,
    storeCredit: {
      value: 0,
      currencyCode: 'EUR',
    },
  }
}

export function normalizeOrder(data: AquilacmsOrder): Order {
  return {
    id: data._id,
    code: data.number,
    status: data.status,
    price: {
      value: data.priceTotal.ati,
      currency: 'EUR',
    },
    items: [],
    createdAt: data.created_at,
  }
}
