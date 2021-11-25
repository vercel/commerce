import { HomeFeatureItemProps } from './../../../src/components/modules/home/HomeFeature/components/HomeFeatureItem/HomeFeatureItem';
import { Cart, CartCheckout, ShippingAddress } from '@commerce/types/cart';
import { Product as ProductTypes, ProductCard } from '@commerce/types/product';
import { BannerItemProps } from 'src/components/common/Banner/BannerItem/BannerItem';
import { BlogProps, OrderState, DataHomeProps } from 'src/utils/types.utils';
import { Banner, Blog, Favorite, Feature, Product, Recipe, SearchResultFragment, ShippingMethod, DataHome, CartFragment, RecipeIngredient } from '../schema';
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
      collection: item.collections?.[0] ? item.collections?.[0].name : '',
      collectionIds: item.collections?.map(colection => colection.id),
      facetValueIds: item.facetValues?.map(facet => facet.id),
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
      discounts: l.discounts.map((d) => ({ value: d.amountWithTax / 100 })),
      path: '',
      variant: {
        id: l.productVariant.id,
        name: l.productVariant.name,
        sku: l.productVariant.sku,
        price: l.discountedUnitPriceWithTax / 100,
        oldPrice: l.productVariant.priceWithTax / 100,
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
    couponCodes: order.couponCodes,
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
        oldPrice: l.linePriceWithTax / 100,
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
    collection: product.collection ? product.collection[0] : ""
  }
}
export function normalizeFavoriteProductResult(item: Favorite) {

  return {
    id: item.product.id,
    name: item.product.name,
    slug: item.product.slug,
    imageSrc: item.product?.featuredAsset?.preview ? item.product?.featuredAsset?.preview + '?w=800&mode=crop' : null,
    price: item.product.variants[0].priceWithTax as number / 100,
    currencyCode: item.product.variants[0].currencyCode,
    productVariantId: item.product.variants?.[0]?.id.toString(),
    productVariantName: item.product.variants?.[0]?.name,
    collection: item.product?.collections?.[0] ? item.product?.collections?.[0].name : null,
    collectionIds: item.product?.collections?.map(colection => colection.id) || null,
    facetValueIds: item.product?.facetValues?.map(facet => facet.id) || null,
  }
}

export function normalizeRecipe(recipe: Recipe): RecipeProps {
  console.log("raw here: ", recipe)
  return {
    id: recipe.id || '',
    title: recipe.title || '',
    images: recipe?.assets?.map((a) => ({
      name: a.name,
      url: a.preview ? a.preview + '?w=800&mode=crop' : '',
    })) || [],
    imageSrc: recipe.featuredAsset?.preview ? recipe.featuredAsset?.preview + '?w=800&mode=crop' : '',
    slug: recipe.slug || '',
    description: recipe.description || '',
    content: recipe.content || '',
    createdAt: recipe.createdAt || '',
    time: recipe.time || '',
    people: recipe.people || '',
    country: recipe.country || '',
    ingredients: recipe.ingredients?.map((item: RecipeIngredient) => {
      const product = item.productVariant.product
      const productVariant = item.productVariant

      return {
        id: product.id,
        name: productVariant.name,
        slug: product.slug,
        imageSrc: product.featuredAsset?.preview ? product.featuredAsset?.preview + '?w=800&mode=crop' : '',
        currencyCode: productVariant.currencyCode || '',
        productVariantId: productVariant.id?.toString() || '',
        productVariantName: productVariant.name || '',
        price: productVariant.priceWithTax / 100 || null,
        collection: product.collections?.[0] ? product.collections?.[0]?.name : '',
        collectionIds: product.collections?.map(colection => colection.id) || null,
        facetValueIds: product.facetValues?.map(facet => facet.id) || null,
        quantity: item.quantity,
      }
    }) || [],
    recommendedRecipes: recipe.recommendedRecipes?.map((recipe: Recipe) => ({
      id: recipe.id || '',
      title: recipe.title || '',
      imageSrc: recipe.featuredAsset?.preview || '',
      slug: recipe.slug || '',
      description: recipe.description || '',
      people: recipe.people || '',
      time: recipe.time || '',
      country: recipe.country || ''
    })) || []
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


export function normalizeHome(dataHome: DataHome): DataHomeProps {
  return {
    bannerLeftTitle: dataHome?.bannerLeftTitle || null,
    videoTitle: dataHome?.videoTitle || null,
    videoLink: dataHome?.videoLink || null,
    imageSrcLogo: dataHome?.videoLogo?.preview ? dataHome.videoLogo?.preview + '?w=800&mode=crop' : null,
    imageSrcBannerLeft: dataHome?.bannerLeftImg?.preview ? dataHome.bannerLeftImg?.preview + '?w=800&mode=crop' : null
  }
}
export function normalizeBanner(banner: Banner): BannerItemProps {
  return {
    imgLink: banner.img?.preview || '',
    title: banner.title,
    subtitle: banner.subtitle || '',
    buttonLabel: banner.buttonLabel || '',
    linkButton: banner.buttonLink || '',
    backgroundColor: banner.backgroundColor || ''
  }
}


export function normalizeHomeFeature(feature: Feature): HomeFeatureItemProps {
  return {
    imageSrc: feature.asset?.preview || null,
    content: feature.content || null,
  }
}


