import forceIsomorphicConfigValues from './utils/force-isomorphic-config-values'
import requireConfig from './utils/require-config'
import validateAllProductsTaxonomyId from './utils/validate-all-products-taxonomy-id'
import validateCookieExpire from './utils/validate-cookie-expire'
import validatePlaceholderImageUrl from './utils/validate-placeholder-image-url'
import validateProductsPrerenderCount from './utils/validate-products-prerender-count'

const isomorphicConfig = {
  apiHost: process.env.NEXT_PUBLIC_SPREE_API_HOST,
  defaultLocale: process.env.NEXT_PUBLIC_SPREE_DEFAULT_LOCALE,
  cartCookieName: process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_NAME,
  cartCookieExpire: validateCookieExpire(
    process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_EXPIRE
  ),
  imageHost: process.env.NEXT_PUBLIC_SPREE_IMAGE_HOST,
  categoriesTaxonomyPermalink:
    process.env.NEXT_PUBLIC_SPREE_CATEGORIES_TAXONOMY_PERMALINK,
  brandsTaxonomyPermalink:
    process.env.NEXT_PUBLIC_SPREE_BRANDS_TAXONOMY_PERMALINK,
  allProductsTaxonomyId: validateAllProductsTaxonomyId(
    process.env.NEXT_PUBLIC_SPREE_ALL_PRODUCTS_TAXONOMY_ID
  ),
  showSingleVariantOptions:
    process.env.NEXT_PUBLIC_SPREE_SHOW_SINGLE_VARIANT_OPTIONS === 'true',
  lastUpdatedProductsPrerenderCount: validateProductsPrerenderCount(
    process.env.NEXT_PUBLIC_SPREE_LAST_UPDATED_PRODUCTS_PRERENDER_COUNT
  ),
  productPlaceholderImageUrl: validatePlaceholderImageUrl(
    process.env.NEXT_PUBLIC_SPREE_PRODUCT_PLACEHOLDER_IMAGE_URL
  ),
  lineItemPlaceholderImageUrl: validatePlaceholderImageUrl(
    process.env.NEXT_PUBLIC_SPREE_LINE_ITEM_PLACEHOLDER_IMAGE_URL
  ),
}

export default forceIsomorphicConfigValues(
  isomorphicConfig,
  [],
  [
    'apiHost',
    'defaultLocale',
    'cartCookieName',
    'cartCookieExpire',
    'imageHost',
    'categoriesTaxonomyPermalink',
    'brandsTaxonomyPermalink',
    'allProductsTaxonomyId',
    'showSingleVariantOptions',
    'lastUpdatedProductsPrerenderCount',
    'productPlaceholderImageUrl',
    'lineItemPlaceholderImageUrl',
  ]
)

type IsomorphicConfig = typeof isomorphicConfig

const requireConfigValue = (key: keyof IsomorphicConfig) =>
  requireConfig<IsomorphicConfig>(isomorphicConfig, key)

export { requireConfigValue }
