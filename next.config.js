/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: true
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
        hostname: 'ssc-sparkle.vercel.app',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'publish-p64257-e147834-cmstg.adobeaemcloud.com',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
};
