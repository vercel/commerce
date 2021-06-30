import type {
  CommercetoolsProduct,
  Product,
  ProductVariant,
  CommercetoolsProductVariant,
  CommerceToolsProductPrice,
  ProductPrice,
} from '@framework/types/product'
import type {
  Cart,
  CommercetoolsCart,
  CommercetoolsLineItems,
  LineItem,
} from '@framework/types/cart'

import type {
  CommercetoolsBrands,
  CommercetoolsCategory,
  Category,
  Brand,
} from '@framework/types/site'

import { arrayToTree } from '@framework/lib/array-to-tree'

function normalizeVariants(
  variants: CommercetoolsProductVariant[],
  published: boolean
): ProductVariant[] {
  return variants.map((variant) => {
    return {
      id: variant.id,
      options: [],
      availableForSale: published,
    }
  })
}

function normalizePrice(price: CommerceToolsProductPrice): ProductPrice {
  const value =
    price.discounted && price.discounted.value
      ? price.discounted.value.centAmount
      : price.value.centAmount
  return {
    value: value / 100,
    currencyCode: price.value.currencyCode,
    retailPrice: 0,
    salePrice: 0,
    listPrice: 0,
    extendedListPrice: 0,
    extendedSalePrice: 0,
  }
}

export function normalizeProduct(data: CommercetoolsProduct): Product {
  return {
    id: data.id,
    name: data.name.en,
    description:
      data.description && data.description.en
        ? data.description.en
        : 'No description',
    slug: data.slug.en,
    path: data.slug.en,
    images: data.masterVariant.images,
    variants: normalizeVariants(data.variants, data.published),
    options: [],
    price: normalizePrice(
      data.masterVariant.price
        ? data.masterVariant.price
        : data.masterVariant.prices[0]
    ),
    sku: data.masterVariant.sku,
  }
}

function convertTaxMode(data: CommercetoolsCart): boolean {
  return data && data.taxMode && data.taxMode === 'Disabled'
    ? false
    : data && data.taxMode
    ? true
    : false
}
export function normalizeCart(data: CommercetoolsCart): Cart {
  const totalPrice =
    data.taxedPrice &&
    data.taxedPrice.totalGross &&
    data.taxedPrice.totalGross.centAmount
      ? data.taxedPrice.totalGross.centAmount / 100
      : data.totalPrice.centAmount / 100
  return {
    id: data.id,
    customerId: data.customerId,
    email: data.customerEmail,
    createdAt: data.createdAt,
    currency: { code: data.totalPrice.currencyCode },
    taxesIncluded: convertTaxMode(data),
    lineItems: data.lineItems.map((item) => normalizeLineItem(item)),
    lineItemsSubtotalPrice: 0,
    subtotalPrice: 0,
    totalPrice,
    discounts: [],
  }
}

function normalizeLineItem(item: CommercetoolsLineItems): LineItem {
  const price =
    item.price && item.price.value && item.price.value.centAmount
      ? item.price.value.centAmount
      : item.variant.prices[0].value.centAmount
  return {
    id: item.id,
    variantId: item.variant.id,
    productId: item.productId,
    name: item.name,
    quantity: item.quantity,
    variant: {
      id: item.variant.id,
      sku: item.variant.sku,
      name: item.variant.key,
      image: {
        url:
          item.variant.images &&
          item.variant.images[0] &&
          item.variant.images[0].url
            ? item.variant.images[0].url
            : '',
        width:
          item.variant.images &&
          item.variant.images[0] &&
          item.variant.images[0].dimensions &&
          item.variant.images[0].dimensions.w
            ? item.variant.images[0].dimensions.w
            : undefined,
        height:
          item.variant.images &&
          item.variant.images[0] &&
          item.variant.images[0].dimensions &&
          item.variant.images[0].dimensions.h
            ? item.variant.images[0].dimensions.h
            : undefined,
      },
      requiresShipping: false,
      price: price / 100,
      listPrice: 0,
    },
    path: item.productSlug,
    discounts: [],
  }
}

type Site = { categories: any[]; brands: Brand[] }

export function normalizeSite(
  ctCategories: CommercetoolsCategory[],
  ctBrands: CommercetoolsBrands[]
): Site {
  const categories = ctCategories.map((ctCategory) => {
    return {
      id: ctCategory.id,
      // TODO: TEC-264 we need to handle locale properly
      name: ctCategory.name,
      slug: ctCategory.slug,
      path: ctCategory.slug,
      //add a random parentId to add in children array
      parent: ctCategory.parent ? ctCategory.parent : { id: 'idRoot' },
    }
  })

  const treeCategories = arrayToTree(categories).children

  const brands = ctBrands.map((ctBrand) => {
    return {
      node: {
        name: ctBrand.label,
        path: `brands/${ctBrand.key}`,
        entityId: ctBrand.key,
      },
    }
  })

  return {
    categories: treeCategories,
    brands,
  }
}
