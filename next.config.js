const providerConfig = require('./framework/bigcommerce/config.json')
const providerNextConfig = require('./framework/bigcommerce/next.config')
const bootstrap = require('./framework/commerce/utils/bootstrap')
const d = require('deepmerge')

module.exports = d(providerNextConfig, bootstrap(providerConfig))
