import forceIsomorphicConfigValues from './utils/force-isomorphic-config-values'
import requireConfig from './utils/require-config'
import validateCookieExpire from './utils/validate-cookie-expire'
import validateProductsPrerenderCount from './utils/validate-products-prerender-count'

const isomorphicConfig = {
  apiHost: process.env.NEXT_PUBLIC_SPREE_API_HOST,
  defaultLocale: process.env.NEXT_PUBLIC_SPREE_DEFAULT_LOCALE,
  cartCookieName: process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_NAME,
  cartCookieExpire: validateCookieExpire(
    process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_EXPIRE
  ),
  imageHost: process.env.NEXT_PUBLIC_SPREE_IMAGE_HOST,
  categoriesTaxonomyId: process.env.NEXT_PUBLIC_SPREE_CATEGORIES_TAXONOMY_ID,
  brandsTaxonomyId: process.env.NEXT_PUBLIC_SPREE_BRANDS_TAXONOMY_ID,
  showSingleVariantOptions:
    process.env.NEXT_PUBLIC_SPREE_SHOW_SINGLE_VARIANT_OPTIONS === 'true',
  lastUpdatedProductsPrerenderCount: validateProductsPrerenderCount(
    process.env.NEXT_PUBLIC_SPREE_LAST_UPDATED_PRODUCTS_PRERENDER_COUNT
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
    'categoriesTaxonomyId',
    'brandsTaxonomyId',
    'showSingleVariantOptions',
    'lastUpdatedProductsPrerenderCount',
  ]
)

type IsomorphicConfig = typeof isomorphicConfig

const requireConfigValue = (key: keyof IsomorphicConfig) =>
  requireConfig<IsomorphicConfig>(isomorphicConfig, key)

export { requireConfigValue }
