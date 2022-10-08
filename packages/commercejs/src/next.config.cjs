const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: ['cdn.chec.io'],
  },
  rewrites() {
    return [
      {
        source: '/api/login/:token',
        destination: '/api/login?token=:token',
      },
    ]
  },
}
