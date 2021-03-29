/**
 * This file is expected to be used in next.config.js only
 */

const path = require('path')
const fs = require('fs')
const merge = require('deepmerge')
const prettier = require('prettier')

const PROVIDERS = ['bigcommerce', 'shopify']

function getProviderName() {
  return (
    process.env.COMMERCE_PROVIDER ||
    (process.env.BIGCOMMERCE_STOREFRONT_API_URL
      ? 'bigcommerce'
      : process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
      ? 'shopify'
      : null)
  )
}

function withCommerceConfig(nextConfig = {}) {
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

  const commerceNextConfig = require(path.join('../', name, 'next.config'))
  const config = merge(commerceNextConfig, nextConfig)

  config.env = config.env || {}

  Object.entries(config.commerce.features).forEach(([k, v]) => {
    if (v) config.env[`COMMERCE_${k.toUpperCase()}_ENABLED`] = true
  })

  // Update paths in `tsconfig.json` to point to the selected provider
  if (config.commerce.updateTSConfig !== false) {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')
    const tsconfig = require(tsconfigPath)

    tsconfig.compilerOptions.paths['@framework'] = [`framework/${name}`]
    tsconfig.compilerOptions.paths['@framework/*'] = [`framework/${name}/*`]

    fs.writeFileSync(
      tsconfigPath,
      prettier.format(JSON.stringify(tsconfig), { parser: 'json' })
    )
  }

  return config
}

module.exports = { withCommerceConfig, getProviderName }
