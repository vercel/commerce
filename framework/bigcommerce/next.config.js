const providerConfig = require('./config.json')

module.exports = {
  commerce: {
    provider: 'bigcommerce',
    ...providerConfig,
  },
  images: {
    domains: ['cdn11.bigcommerce.com'],
  },
}
