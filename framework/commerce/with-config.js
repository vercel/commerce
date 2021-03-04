/**
 * This file is expected to be used in next.config.js only
 */

const merge = require('deepmerge')

const PROVIDERS = ['bigcommerce', 'shopify']

function getProviderName() {
  // TODO: OSOT.
  return process.env.BIGCOMMERCE_STOREFRONT_API_URL ? 'bigcommerce' : null
}

module.exports = (nextConfig = {}) => {
  const commerce = nextConfig.commerce || {}
  const name = commerce.provider || getProviderName()

  if (!name) {
    throw new Error(
      `The commerce provider is missing, please add a valid provider name or its environment variables`
    )
  }
  if (!PROVIDERS.includes(name)) {
    throw new Error(
      `The commerce provider "${name}" can't be found, please use one of "${PROVIDERS.join(
        ', '
      )}"`
    )
  }

  const commerceNextConfig = require(`../${name}/next.config`)
  const config = merge(commerceNextConfig, nextConfig)

  config.env = config.env || {}

  Object.entries(config.commerce.features).forEach(([k, v]) => {
    if (v) config.env[`COMMERCE_${k.toUpperCase()}_ENABLED`] = true
  })

  return config
}
