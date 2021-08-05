const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: ['s3-eu-west-1.amazonaws.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.constants = false;
    }
    return config;
  }
}
