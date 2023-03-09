import type {
  Product,
  ProductOption,
  ProductOptionValues,
  ProductVariant,
} from '../types/product'
import {
  OCCategory,
  Category,
  Brand,
  OCVendor,
  Navigation,
} from '../types/site'
import {
  CatalogItemProduct,
  CatalogProductVariant,
  ImageInfo,
  Cart as OCCart,
  CartItemEdge,
  NavigationTreeItem,
  Checkout as OCCheckout,
} from '../../schema'
import { Cart, Checkout, LineItem, FulfillmentGroup } from '../types/cart'

const normalizeProductImages = (images: ImageInfo[], name: string) =>
  images.map((image) => ({
    url: image?.URLs?.original || image?.URLs?.medium || '',
    alt: name,
  }))

export function normalizeProduct(
  productNode: CatalogItemProduct | null
): Product {
  const product = productNode?.product
  if (!product) {
    return <Product>{}
  }

  const {
    _id,
    productId,
    title,
    description,
    slug,
    sku,
    media,
    pricing,
    variants,
  } = product

  return {
    id: productNode._id || productId,
    name: title ?? '',
    description: description ?? '',
    slug: slug?.replace(/^\/+|\/+$/g, '') ?? '',
    path: `/${slug}` ?? '/',
    sku: sku ?? '',
    images: media?.length
      ? normalizeProductImages(<ImageInfo[]>media, title ?? '')
      : [],
    ...(product.vendor ? { vendor: product.vendor } : {}),
    price: {
      value: pricing[0]?.price || pricing[0]?.minPrice || 0,
      currencyCode: pricing[0]?.currency.code,
    },
    variants: !!variants
      ? normalizeProductVariants(<CatalogProductVariant[]>variants)
      : [],
    options: !!variants
      ? groupProductOptionsByAttributeLabel(<CatalogProductVariant[]>variants)
      : [],
  }
}

function groupProductOptionsByAttributeLabel(
  variants: CatalogProductVariant[]
): ProductOption[] {
  return variants.reduce(
    (
      groupedOptions: ProductOption[],
      currentVariant: CatalogProductVariant
    ) => {
      groupedOptions = mergeVariantOptionsWithExistingOptions(
        groupedOptions,
        currentVariant
      )

      if (variantHasOptions(currentVariant)) {
        ;(<CatalogProductVariant[]>currentVariant.options).forEach(
          (variantOption) => {
            groupedOptions = mergeVariantOptionsWithExistingOptions(
              groupedOptions,
              variantOption
            )
          }
        )
      }

      return groupedOptions
    },
    []
  )
}

function mergeVariantOptionsWithExistingOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
): ProductOption[] {
  const matchingOptionIndex = findCurrentVariantOptionsInGroupedOptions(
    groupedOptions,
    currentVariant
  )

  return matchingOptionIndex !== -1
    ? mergeWithExistingOptions(
        groupedOptions,
        currentVariant,
        matchingOptionIndex
      )
    : addNewProductOption(groupedOptions, currentVariant)
}

function addNewProductOption(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
) {
  return [...groupedOptions, normalizeProductOption(currentVariant)]
}

function findCurrentVariantOptionsInGroupedOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
): number {
  return groupedOptions.findIndex(
    (option) =>
      option.displayName.toLowerCase() ===
      currentVariant.attributeLabel.toLowerCase()
  )
}

function mergeWithExistingOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant,
  matchingOptionIndex: number
) {
  const currentVariantOption = normalizeProductOption(currentVariant)
  groupedOptions[matchingOptionIndex].values = [
    ...groupedOptions[matchingOptionIndex].values,
    ...currentVariantOption.values,
  ]

  return groupedOptions
}

const normalizeProductVariants = (
  variants: CatalogProductVariant[]
): ProductVariant[] => {
  return variants.reduce(
    (productVariants: ProductVariant[], variant: CatalogProductVariant) => {
      if (variantHasOptions(variant)) {
        productVariants.push(...flatVariantOptions(variant))
        return productVariants
      }

      const { pricing = [], variantId } = variant ?? {}
      const variantPrice = pricing[0]?.price ?? pricing[0]?.minPrice ?? 0

      productVariants.push({
        id: variantId ?? '',
        price: { value: variantPrice },
        options: [normalizeProductOption(variant)],
      })

      return productVariants
    },
    []
  )
}
const normalizeProductOption = (
  variant: CatalogProductVariant
): ProductOption => {
  const option = <ProductOption>{
    __typename: 'MultipleChoiceOption',
    id: variant._id,
    displayName: variant.attributeLabel,
    values: variant.optionTitle
      ? [{ label: variant.optionTitle }]
      : [{ label: '' }],
  }
  option.values = option.values.map((value) =>
    colorizeProductOptionValue(value, option.displayName)
  )

  return option
}

function flatVariantOptions(variant: CatalogProductVariant): ProductVariant[] {
  const variantOptions = <CatalogProductVariant[]>variant.options

  return normalizeProductVariants(variantOptions).map((variantOption) => {
    variantOption.options.push(normalizeProductOption(variant))
    return variantOption
  })
}

function variantHasOptions(variant: CatalogProductVariant) {
  return !!variant.options && variant.options.length != 0
}

function colorizeProductOptionValue(
  value: ProductOptionValues,
  displayName: string
): ProductOptionValues {
  if (displayName.toLowerCase() === 'color') {
    value.hexColors = [value.label]
  }
  return value
}

export function normalizeCategory(category: OCCategory): Category {
  return {
    id: category._id,
    name: category.displayTitle ?? '',
    slug: category.slug ?? '',
    path: category.slug ? `/${category.slug}` : '',
  }
}

export function normalizeVendors({ name }: OCVendor): Brand {
  return {
    id: name ?? '',
    name: name ?? '',
    path: `/${name}`,
    slug: `/brands/${name}`,
  }
}

export function normalizeCart(cart: OCCart): Cart {
  return {
    id: cart._id,
    customerId: cart.account?._id ?? '',
    email:
      (cart.account?.emailRecords && cart.account?.emailRecords[0]?.address) ??
      '',

    createdAt: cart.createdAt,
    currency: {
      code: cart.checkout?.summary?.total?.currency.code ?? 'USD',
    },
    lineItems:
      cart.items?.edges?.map((cartItem) =>
        normalizeLineItem(<CartItemEdge>cartItem)
      ) ?? [],
    lineItemsSubtotalPrice: +(cart.checkout?.summary?.itemTotal?.amount ?? 0),
    subtotalPrice: +(cart.checkout?.summary?.itemTotal?.amount ?? 0),
    totalPrice: cart.checkout?.summary?.total?.amount ?? 0,
    discounts: [],
    taxesIncluded: !!cart.checkout?.summary?.taxTotal?.amount,
  }
}

function filterNullValue<T>(
  items: (T | null | undefined)[] | null | undefined
): T[] {
  return items?.filter((item: T | null | undefined): item is T => !!item) ?? []
}

export function normalizeCheckout(checkout: OCCheckout): Checkout {
  const fulfillmentGroups = filterNullValue(checkout.fulfillmentGroups).map(
    (group) => ({
      selectedFulfillmentOption: group.selectedFulfillmentOption,
      type: group.type,
      _id: group._id,
      data: group.data,
      availableFulfillmentOptions: filterNullValue(
        group.availableFulfillmentOptions
      ),
    })
  ) as FulfillmentGroup[]

  return {
    ...checkout,
    fulfillmentGroups,
  }
}

function normalizeLineItem(cartItemEdge: CartItemEdge): LineItem {
  const cartItem = cartItemEdge.node

  if (!cartItem) {
    return <LineItem>{}
  }

  const {
    _id,
    compareAtPrice,
    imageURLs,
    title,
    productConfiguration,
    priceWhenAdded,
    optionTitle,
    variantTitle,
    quantity,
    productSlug,
  } = cartItem

  return {
    id: _id,
    variantId: String(productConfiguration?.productVariantId),
    productId: String(productConfiguration?.productId),
    name: `${title}`,
    quantity,
    variant: {
      id: String(productConfiguration?.productVariantId),
      sku: String(productConfiguration?.productVariantId),
      name: String(optionTitle || variantTitle),
      image: {
        url: imageURLs?.thumbnail ?? '/product-img-placeholder.svg',
      },
      requiresShipping: true,
      price: priceWhenAdded?.amount,
      listPrice: compareAtPrice?.amount ?? 0,
    },
    path: `/${productSlug}` ?? '',
    discounts: [],
    options: [
      {
        value: String(optionTitle || variantTitle),
        name: String(optionTitle || variantTitle),
      },
    ],
  }
}

const normalizeUrl = (url: string) => {
  const splittedUrls = url.split('/')
  return '/search/'.concat(splittedUrls.slice(2).join('/'))
}

export const normalizeNavigation = (
  navigationTreeItems: NavigationTreeItem[]
): Navigation[] => {
  return navigationTreeItems.map(({ items, navigationItem: { data } }) => {
    const url = data?.url || '/'
    const normalizedUrl =
      data?.isUrlRelative && url.startsWith('/tag') ? normalizeUrl(url) : url

    return {
      url: normalizedUrl,
      label: data?.contentForLanguage ?? 'N/A',
      isUrlRelative: !!data?.isUrlRelative,
      shouldOpenInNewWindow: !!data?.shouldOpenInNewWindow,
      items: normalizeNavigation((items ?? []) as NavigationTreeItem[]),
    }
  })
}
