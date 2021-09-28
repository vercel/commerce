const commerce = require('./commerce.config.json')

module.exports = {
  images: {
    disableStaticImages: true,
    domains: [
      'localhost',
      '206.189.135.123',
      's3-eu-west-1.amazonaws.com'
    ]
  },
  commerce,
  i18n: {
    locales: ['en-US', 'es'],
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

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))