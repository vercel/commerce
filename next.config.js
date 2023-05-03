/** @type {import('next').NextConfig} */
const { i18n } = require('./languages.json')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  {
    eslint: {
      // Disabling on production builds because we're running checks on PRs via GitHub Actions.
      ignoreDuringBuilds: true
    },
    experimental: {
      appDir: true
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      domains: ['cdn.sanity.io'],
    },
  }
);
