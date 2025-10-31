export default {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    viewTransition: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: 'hopsstock.blob.core.windows.net'
      },
      {
        protocol: 'https',
        hostname: 'hodgesbadge.azureedge.net'
      }
    ]
  }
};
