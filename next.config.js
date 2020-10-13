module.exports = {
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
    ]
  },
}
