const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: [new URL(process.env.AQUILACMS_URL).hostname],
  },
}
