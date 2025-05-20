process.env.COMMERCE_PROVIDER ??= 'local';
// 🔧 fallback so the build never crashes if COMMERCE_PROVIDER is missing
if (!process.env.COMMERCE_PROVIDER) {
  process.env.COMMERCE_PROVIDER = 'local';
}
export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
