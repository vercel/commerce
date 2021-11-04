import { RecipeCardProps } from './../../../src/components/common/RecipeCard/RecipeCard'
import { Cart, CartCheckout, ShippingAddress } from '@commerce/types/cart'
import { Product, ProductCard } from '@commerce/types/product'
import { BlogProps, OrderState } from 'src/utils/types.utils'
import {
  CartFragment,
  SearchResultFragment,
  Favorite,
  ShippingMethod,
  Blog,
  Recipe,
} from '../schema'
import { RecipeList } from '@commerce/types/recipes'

export function normalizeSearchResult(item: SearchResultFragment): ProductCard {
  return {
    id: item.productId,
    name: item.productName,
    slug: item.slug,
    imageSrc: item.productAsset?.preview
      ? item.productAsset?.preview + '?w=800&mode=crop'
      : '',
    price: (item.priceWithTax as any).min / 100,
    currencyCode: item.currencyCode,
    productVariantId: item.productVariantId,
    productVariantName: item.productVariantName,
    facetValueIds: item.facetValueIds,
    collectionIds: item.collectionIds,

    // TODO:
    // oldPrice: item.price
    // discount
    // isNotSell
    // weight
  }
}

export function normalizeFavoriteProductResult(item: Favorite) {
  return {
    id: item.product.id,
    name: item.product.name,
    slug: item.product.slug,
    imageSrc: item.product.assets[0].preview
      ? item.product.assets[0].preview + '?w=800&mode=crop'
      : '',
    price: (item.product.variants[0].priceWithTax as number) / 100,
    currencyCode: item.product.variants[0].currencyCode,
  }
}

export function normalizeCart(order: CartFragment): Cart {
  return {
    id: order.id.toString(),
    createdAt: order.createdAt,
    taxesIncluded: true,
    lineItemsSubtotalPrice: order.subTotalWithTax / 100,
    currency: { code: order.currencyCode },
    subtotalPrice: order.subTotalWithTax / 100,
    totalPrice: order.totalWithTax / 100,
    customerId: order.customer?.id,
    state: order.state as OrderState,
    lineItems: order.lines?.map((l) => ({
      id: l.id,
      name: l.productVariant.name,
      quantity: l.quantity,
      slug: l.productVariant.product.slug,
      variantId: l.productVariant.id,
      productId: l.productVariant.productId,
      images: [{ url: l.featuredAsset?.preview + '?preset=thumb' || '' }],
      discounts: l.discounts.map((d) => ({ value: d.amount / 100 })),
      path: '',
      variant: {
        id: l.productVariant.id,
        name: l.productVariant.name,
        sku: l.productVariant.sku,
        price: l.discountedUnitPriceWithTax / 100,
        listPrice: l.unitPriceWithTax / 100,
        image: {
          url: l.featuredAsset?.preview + '?preset=thumb' || '',
        },
        requiresShipping: true,
      },
    })),
  }
}

export function normalizeCartForCheckout(order: CartFragment): CartCheckout {
  return {
    id: order.id.toString(),
    state: order.state as OrderState,
    code: order.code,
    createdAt: order.createdAt,
    taxesIncluded: true,
    totalQuantity: order.totalQuantity,
    lineItemsSubtotalPrice: order.subTotalWithTax / 100,
    currency: { code: order.currencyCode },
    subtotalPrice: order.subTotalWithTax / 100,
    totalPrice: order.totalWithTax / 100,
    customerId: order.customer?.id,
    customer: {
      firstName: order.customer?.firstName || '',
      lastName: order.customer?.lastName || '',
      emailAddress: order.customer?.emailAddress || '',
    },
    shippingAddress: {
      streetLine1: order.shippingAddress?.streetLine1 || '',
      city: order.shippingAddress?.city || '',
      province: order.shippingAddress?.province || '',
      postalCode: order.shippingAddress?.postalCode || '',
      countryCode: order.shippingAddress?.countryCode || '',
      phoneNumber: order.shippingAddress?.phoneNumber || '',
    } as ShippingAddress,
    shippingLine: order.shippingLines[0]
      ? {
          priceWithTax: order.shippingLines[0]?.priceWithTax / 100,
          shippingMethod: order.shippingLines[0]
            ?.shippingMethod as ShippingMethod,
        }
      : undefined,
    totalDiscount:
      order.discounts?.reduce((total, item) => total + item.amountWithTax, 0) /
        100 || 0,
    discounts: order.discounts.map((item) => {
      return { value: item.amountWithTax, description: item.description }
    }),
    lineItems: order.lines?.map((l) => ({
      id: l.id,
      name: l.productVariant.name,
      quantity: l.quantity,
      slug: l.productVariant.product.slug,
      variantId: l.productVariant.id,
      productId: l.productVariant.productId,
      images: [{ url: l.featuredAsset?.preview + '?preset=thumb' || '' }],
      discounts: l.discounts.map((d) => ({ value: d.amount / 100 })),
      path: '',
      variant: {
        id: l.productVariant.id,
        name: l.productVariant.name,
        sku: l.productVariant.sku,
        price: l.discountedUnitPriceWithTax / 100,
        listPrice: l.unitPriceWithTax / 100,
        image: {
          url: l.featuredAsset?.preview + '?preset=thumb' || '',
        },
        requiresShipping: true,
      },
    })),
  }
}

export function normalizeProductCard(product: Product): ProductCard {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    imageSrc: product.images[0].url,
    price: product.price,
    currencyCode: product.currencyCode,
    productVariantId: product.variants?.[0].id.toString(),
    productVariantName: product.variants?.[0].name,
    facetValueIds: product.facetValueIds,
    collectionIds: product.collectionIds,
  }
}

export function normalizeBlog(blog: Blog): BlogProps {
  return {
    id: blog.id,
    title: blog.title,
    imageSrc: blog.featuredAsset?.preview || null,
    slug: blog.slug,
    description: blog.description || '',
    content: blog.content || '',
    isPublish: blog.isPublish,
    isFeatured: blog.isFeatured ?? null,
    authorName: blog.authorName || '',
    authorAvatarAsset: blog.authorAvatarAsset?.preview || null,
    createdAt: blog.createdAt,
  }
}

export function normalizeRecipeList(recipe: Recipe) {
  return {
    id: recipe.id,
    title: recipe.translations[0]?.title,
    imageSrc: recipe.featuredAsset?.preview ?? null,
    slug: recipe.translations[0]?.slug,
    description: recipe.translations[0]?.description,
    isPublish: recipe.isPublish,
    // authorName: recipe.authorName,
    // authorAvatarAsset : recipe.authorAvatarAsset?.preview,
    createdAt: recipe.createdAt,
  }
}

export function normalizeRecipe(recipe: RecipeList): RecipeCardProps {
    return {
      title:recipe.title,
      id:recipe.id,
      slug:recipe.slug,
      imageSrc:recipe.featuredAsset?.preview||"",
      description:recipe.description||""
    }
  
}
