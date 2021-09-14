const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: [process.env.NEXT_PUBLIC_MEDUSA_IMG_HOST],
  },
}
