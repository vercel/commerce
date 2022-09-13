const commerce = require('./commerce.config.json')

module.exports = {
  images: {
    disableStaticImages: true,
    domains: [
      'localhost',
      '206.189.135.123',
      's3-eu-west-1.amazonaws.com',
      'files-eu.epusercontent.com'
    ]
  },
  commerce,
  i18n: {
    defaultLocale: 'en-US',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.constants = false;
    }
    return config;
  }
};
