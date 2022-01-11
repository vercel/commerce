/**
 * This file is expected to be used in next.config.js only
 */

const path = require('path')
const merge = require('deepmerge')

function withCommerceConfig(nextConfig = {}) {
  const commerce = nextConfig.commerce || {}
  const { provider } = commerce

  if (!provider) {
    throw new Error(
      `The commerce provider is missing, please add a valid provider name`
    )
  }

  const commerceNextConfig = require(path.join(provider, 'next.config'))
  const config = merge(nextConfig, commerceNextConfig)

  config.env = config.env || {}

  Object.entries(config.commerce.features).forEach(([k, v]) => {
    if (v) config.env[`COMMERCE_${k.toUpperCase()}_ENABLED`] = true
  })

  return config
}

module.exports = { withCommerceConfig }
