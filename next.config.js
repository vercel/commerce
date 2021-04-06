const commerce = require('./framework/aquilacms/commerce.config.json')
const withCommerceConfig = require('./framework/commerce/with-config')

const isBC = commerce.provider === 'bigcommerce'
const isShopify = commerce.provider === 'shopify'
const isAquilacms = commerce.provider === 'aquilacms'

module.exports = withCommerceConfig({
  commerce,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  rewrites() {
    return [
      (isBC || isShopify || isAquilacms) && {
        source: '/checkout',
        destination: '/api/bigcommerce/checkout',
      },
      // The logout is also an action so this route is not required, but it's also another way
      // you can allow a logout!
      (isBC || isAquilacms) && {
        source: '/logout',
        destination: '/api/bigcommerce/customers/logout?redirect_to=/',
      },
      // Rewrites for /search
      {
        source: '/search/designers/:name',
        destination: '/search',
      },
      {
        source: '/search/designers/:name/:category',
        destination: '/search',
      },
      {
        // This rewrite will also handle `/search/designers`
        source: '/search/:category',
        destination: '/search',
      },
    ].filter((x) => x)
  },
})
