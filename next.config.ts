export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
      {
        protocol: 'https',
        hostname: 'linconson-a.netlify.app',
        port: '80',
        pathname: '**',
      },
    ],
  },
  devIndicators: false,
}
