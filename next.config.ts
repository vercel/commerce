export default {
  experimental: {
    ppr: true, // Partial Prerendering
    inlineCss: true, // Inline CSS for faster page loads
    useCache: true, // Experimental caching
    newDevOverlay: true, // New development overlay
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
};