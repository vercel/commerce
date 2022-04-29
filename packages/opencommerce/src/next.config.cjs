const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: [process.env.OPENCOMMERCE_STOREFRONT_API_URL],
  },
}
