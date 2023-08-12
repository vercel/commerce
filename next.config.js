/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  {
    async rewrites() {
      return [
        {
          source: '/en/search',
          destination: '/en/sok',
          locale: false
        },
      ]
    },
    eslint: {
      // Disabling on production builds because we're running checks on PRs via GitHub Actions.
      ignoreDuringBuilds: true
    },
    experimental: {
      scrollRestoration: true,
      serverActions: true,
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      domains: ['cdn.sanity.io'], 
    },
  }
);
