const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  store: {
    host: process.env.SPREE_API_HOST,
  },
  // images: {
  //   domains: [process.env.COMMERCE_IMAGE_HOST],
  // },
  //   locale: 'en-us',
  //   cartCookie: Const.CHECKOUT_ID_COOKIE,
}
