module.exports = {
  images: {
    sizes: [320, 480, 820, 1200, 1600],
    path: 'https://cdn11.bigcommerce.com/',
    loader: 'bigCommerce',
  },
  rewrites() {
    return [
      {
        source: '/search/designers/:name',
        destination: '/search',
      },
      {
        source: '/search/designers/:name/:category',
        destination: '/search',
      },
      {
        // This rewrite will also handle `/search/designers`
        source: '/search/:category',
        destination: '/search',
      },
      {
        source: '/checkout',
        destination: '/api/bigcommerce/checkout',
      },
    ]
  },
}
