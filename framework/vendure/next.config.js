const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: ['localhost', 'vendure-admin-dap.herokuapp.com', 'dap-storage.s3.eu-west-1.amazonaws.com'],
  },
}
