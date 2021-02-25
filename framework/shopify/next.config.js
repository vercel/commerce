const providerConfig = require('./config.json')

module.exports = {
  commerce: {
    provider: 'shopify',
    ...providerConfig,
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
}
