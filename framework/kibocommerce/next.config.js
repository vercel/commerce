const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  serverRuntimeConfig: {
    // Will only be available on the server side
    kiboAuthTicket: null
  },
  images: {
    domains: ['d1slj7rdbjyb5l.cloudfront.net', 'cdn-tp1.mozu.com', 'cdn-sb.mozu.com'],
  },
}
