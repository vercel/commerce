const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: [process.env.NEXT_PUBLIC_SPREE_ALLOWED_IMAGE_DOMAIN],
  },
  rewrites() {
    return [
      {
        source: '/checkout',
        destination: '/api/checkout',
      },
    ]
  },
}
