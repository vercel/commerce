/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
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
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      },
      {
        source: '/:partType/:make/:model/:year/:product',
        destination: (params) => {
          const { partType, make, model, year } = params;
          // Replace underscores with hyphens in the make and model
          const newMake = make.replace(/_/g, '-');
          const newModel = model.replace(/_/g, '-');
          return `/${partType}/${newMake}/${newModel}/${year}`;
        },
        permanent: true
      }
    ];
  }
};
