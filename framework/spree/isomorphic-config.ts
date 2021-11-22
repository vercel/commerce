import forceIsomorphicConfigValues from './utils/force-isomorphic-config-values'
import requireConfig from './utils/require-config'
import validateAllProductsTaxonomyId from './utils/validations/validate-all-products-taxonomy-id'
import validateCookieExpire from './utils/validations/validate-cookie-expire'
import validateImagesOptionFilter from './utils/validations/validate-images-option-filter'
import validatePlaceholderImageUrl from './utils/validations/validate-placeholder-image-url'
import validateProductsPrerenderCount from './utils/validations/validate-products-prerender-count'
import validateImagesSize from './utils/validations/validate-images-size'
import validateImagesQuality from './utils/validations/validate-images-quality'

const isomorphicConfig = {
  apiHost: process.env.NEXT_PUBLIC_SPREE_API_HOST,
  defaultLocale: process.env.NEXT_PUBLIC_SPREE_DEFAULT_LOCALE,
  cartCookieName: process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_NAME,
  cartCookieExpire: validateCookieExpire(
    process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_EXPIRE
  ),
  userCookieName: process.env.NEXT_PUBLIC_SPREE_USER_COOKIE_NAME,
  userCookieExpire: validateCookieExpire(
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
  imagesOptionFilter: validateImagesOptionFilter(
    process.env.NEXT_PUBLIC_SPREE_IMAGES_OPTION_FILTER
  ),
  imagesSize: validateImagesSize(process.env.NEXT_PUBLIC_SPREE_IMAGES_SIZE),
  imagesQuality: validateImagesQuality(
    process.env.NEXT_PUBLIC_SPREE_IMAGES_QUALITY
  ),
  loginAfterSignup: process.env.NEXT_PUBLIC_SPREE_LOGIN_AFTER_SIGNUP === 'true',
}

export default forceIsomorphicConfigValues(
  isomorphicConfig,
  [],
  [
    'apiHost',
    'defaultLocale',
    'cartCookieName',
    'cartCookieExpire',
    'userCookieName',
    'userCookieExpire',
    'imageHost',
    'categoriesTaxonomyPermalink',
    'brandsTaxonomyPermalink',
    'allProductsTaxonomyId',
    'showSingleVariantOptions',
    'lastUpdatedProductsPrerenderCount',
    'productPlaceholderImageUrl',
    'lineItemPlaceholderImageUrl',
    'imagesOptionFilter',
    'imagesSize',
    'imagesQuality',
    'loginAfterSignup',
  ]
)

type IsomorphicConfig = typeof isomorphicConfig

const requireConfigValue = (key: keyof IsomorphicConfig) =>
  requireConfig<IsomorphicConfig>(isomorphicConfig, key)

export { requireConfigValue }
