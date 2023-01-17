const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: [process.env.NEXT_PUBLIC_SYLIUS_ALLOWED_IMAGE_DOMAIN],
  },
  env: {
    COMMERCE_SEARCH_ENABLED: process.env.COMMERCE_SEARCH_ENABLED,
    COMMERCE_CUSTOMERAUTH_ENABLED: process.env.COMMERCE_CUSTOMERAUTH_ENABLED,
    COMMERCE_CART_ENABLED: process.env.COMMERCE_CART_ENABLED,
  },
}
