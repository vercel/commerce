export default {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'labs.commerce.services',
        pathname: '/product/**'
      },
      {
        protocol: 'https',
        hostname: 'labs.commerce.services',
        pathname: '/pagewidget/**'
      }
    ]
  }
};
