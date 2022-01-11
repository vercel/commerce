/**
 * This file is expected to be used in next.config.js only
 */

const path = require('path')
const fs = require('fs')
const prettier = require('prettier')
const core = require('@vercel/commerce/config')

const PROVIDERS = [
  'local',
  'bigcommerce',
  'saleor',
  'shopify',
  'swell',
  'vendure',
  'ordercloud',
  'kibocommerce',
  'spree',
  'commercejs',
]

function getProviderName() {
  return (
    process.env.COMMERCE_PROVIDER ||
    (process.env.BIGCOMMERCE_STOREFRONT_API_URL
      ? 'bigcommerce'
      : process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
      ? 'shopify'
      : process.env.NEXT_PUBLIC_SWELL_STORE_ID
      ? 'swell'
      : 'local')
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

  // Update paths in `tsconfig.json` to point to the selected provider
  if (nextConfig.commerce.updateTSConfig !== false) {
    const tsconfigPath = path.join(
      process.cwd(),
      commerce.tsconfigPath || 'tsconfig.json'
    )
    const tsconfig = require(tsconfigPath)

    tsconfig.compilerOptions.paths['@framework'] = [`framework/${name}`]
    tsconfig.compilerOptions.paths['@framework/*'] = [`framework/${name}/*`]

    fs.writeFileSync(
      tsconfigPath,
      prettier.format(JSON.stringify(tsconfig), { parser: 'json' })
    )
  }

  return core.withCommerceConfig(nextConfig)
}

module.exports = { withCommerceConfig, getProviderName }
