import forceIsomorphicConfigValues from './utils/forceIsomorphicConfigValues'
import requireConfig from './utils/requireConfig'

const isomorphicConfig = {
  spreeApiHost: process.env.NEXT_PUBLIC_SPREE_API_HOST,
  defaultLocale: process.env.NEXT_PUBLIC_SPREE_DEFAULT_LOCALE,
  cartCookieName: process.env.NEXT_PUBLIC_SPREE_CART_COOKIE_NAME,
}

export default forceIsomorphicConfigValues(
  isomorphicConfig,
  ['defaultLocale', 'cartCookieName'],
  ['spreeApiHost']
)

type IsomorphicConfig = typeof isomorphicConfig

const requireConfigValue = (key: keyof IsomorphicConfig) =>
  requireConfig<IsomorphicConfig>(isomorphicConfig, key)

export { requireConfigValue }
