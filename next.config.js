// const providerConfig = require('./framework/bigcommerce/config.json')
// const providerNextConfig = require('./framework/bigcommerce/next.config')
// const bootstrap = require('./framework/commerce/utils/bootstrap')
// const d = require('deepmerge')

// module.exports = d(providerNextConfig, bootstrap(providerConfig))

const withCommerceConfig = require('./framework/commerce/with-config')

const commerce = { provider: 'bigcommerce' }
const isBC = commerce.provider === 'bigcommerce'

module.exports = withCommerceConfig({
  commerce,
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
  },
  rewrites() {
    return [
      isBC && {
        source: '/checkout',
        destination: '/api/bigcommerce/checkout',
      },
      // The logout is also an action so this route is not required, but it's also another way
      // you can allow a logout!
      isBC && {
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

console.log('RESULT', module.exports)
