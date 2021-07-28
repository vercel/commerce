const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.constants = false;
    }
    return config;
  }
}
