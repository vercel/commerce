import forceIsomorphicConfigValues from './utils/forceIsomorphicConfigValues'
import requireConfig from './utils/requireConfig'

const isomorphicConfig = {
  spreeApiHost: process.env.NEXT_PUBLIC_SPREE_API_HOST,
  defaultLocale: process.env.NEXT_PUBLIC_SPREE_DEFAULT_LOCALE,
  cartCookieName: process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_NAME,
  spreeImageHost: process.env.NEXT_PUBLIC_SPREE_IMAGE_HOST,
  spreeCategoriesTaxonomyId:
    process.env.NEXT_PUBLIC_SPREE_CATEGORIES_TAXONOMY_ID,
  spreeBrandsTaxonomyId: process.env.NEXT_PUBLIC_SPREE_BRANDS_TAXONOMY_ID,
  showSingleVariantOptions:
    process.env.NEXT_PUBLIC_SHOW_SINGLE_VARIANT_OPTIONS === 'true',
}

export default forceIsomorphicConfigValues(
  isomorphicConfig,
  [],
  [
    'spreeApiHost',
    'defaultLocale',
    'cartCookieName',
    'spreeImageHost',
    'spreeCategoriesTaxonomyId',
    'spreeBrandsTaxonomyId',
    'showSingleVariantOptions',
  ]
)

type IsomorphicConfig = typeof isomorphicConfig

const requireConfigValue = (key: keyof IsomorphicConfig) =>
  requireConfig<IsomorphicConfig>(isomorphicConfig, key)

export { requireConfigValue }
