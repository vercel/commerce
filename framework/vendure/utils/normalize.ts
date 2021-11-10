import { Cart, CartCheckout, ShippingAddress } from '@commerce/types/cart';
import { Product as ProductTypes, ProductCard } from '@commerce/types/product';
import { BlogProps, OrderState } from 'src/utils/types.utils';
import { Blog, CartFragment, Favorite, Product, Recipe, SearchResultFragment, ShippingMethod } from '../schema';
import { RecipeProps } from './../../../src/utils/types.utils';
import { Product as ProductIngredients } from './../schema.d';
// import { Recipe } from '@commerce/types/recipes'

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

export function normalizeProducts(products: Product[]): ProductCard[] {
  return products.map(item => {
    const firstVariant = item.variants[0]

    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      imageSrc: item.featuredAsset?.preview ? item.featuredAsset?.preview + '?w=800&mode=crop' : '',
      price: (firstVariant.priceWithTax as any) / 100,
      currencyCode: firstVariant.currencyCode,
      productVariantId: firstVariant.id,
      productVariantName: firstVariant.name,
      collection: item.collections[0] ? item.collections[0].name : '',
      collectionIds: item.collections.map(colection => colection.id),
      facetValueIds: item.facetValues.map(facet => facet.id),
    }
  })
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
    shippingLine: order.shippingLines[0] ? {
      priceWithTax: order.shippingLines[0]?.priceWithTax / 100,
      shippingMethod: order.shippingLines[0]?.shippingMethod as ShippingMethod
    } : undefined,
    totalDiscount: order.discounts?.reduce((total, item) => total + item.amountWithTax, 0) / 100 || 0,
    discounts: order.discounts.map(item => {
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

export function normalizeProductCard(product: ProductTypes): ProductCard {
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
export function normalizeFavoriteProductResult(item: Favorite) {
  return {
    id: item.product.id,
    name: item.product.name,
    slug: item.product.slug,
    imageSrc: item.product.assets[0].preview ? item.product.assets[0].preview + '?w=800&mode=crop' : '',
    price: item.product.variants[0].priceWithTax as number / 100,
    currencyCode: item.product.variants[0].currencyCode,
    productVariantId: item.product.variants?.[0]?.id.toString(),
    productVariantName: item.product.variants?.[0]?.name,
  }
}

export function normalizeRecipe(recipe: Recipe): RecipeProps {
  return {
      id: recipe.id || null,
      title: recipe.translations?.[0]?.title || null,
      imageSrc: recipe.featuredAsset?.preview || null,
      slug: recipe.translations?.[0]?.slug || null,
      description: recipe.translations?.[0]?.description || null,
      content: recipe.translations?.[0]?.content || null,
      createdAt: recipe.createdAt || null,
      ingredients : recipe.ingredients?.map((product:ProductIngredients)=>({
        id: product.id,
        name: product.name,
        slug: product.slug,
        imageSrc: product.assets?.[0].preview || null,
        currencyCode: product.variants?.[0]?.currencyCode || null,
        productVariantId: product.variants?.[0]?.id?.toString() || null,
        productVariantName: product.name || null,
        price: product.variants?.[0]?.priceWithTax || null,
      }))||[],
      recommendedRecipes: recipe.recommendedRecipes?.map((recipe:Recipe)=>({
        id: recipe.id || null,
        title: recipe.title || null,
        imageSrc: recipe.featuredAsset?.preview || null,
        slug: recipe.slug || null,
        description: recipe.description || null
      }))||[]
  }
}

export function normalizeRecipes(recipe: Recipe): RecipeProps {

  return {
      id: recipe.id || null,
      title: recipe.translations?.[0]?.title || null,
      imageSrc: recipe.featuredAsset?.preview || null,
      slug: recipe.translations?.[0].slug || null,
      description: recipe.translations?.[0].description || null,
      content: recipe.translations?.[0].content || null,
      createdAt: recipe.createdAt || null
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
    createdAt: blog.createdAt
  }
}

