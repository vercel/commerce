/**
 * This file is expected to be used in next.config.js only
 */

const path = require('path')
const fs = require('fs')
const merge = require('deepmerge')
const prettier = require('prettier')
const core = require('@vercel/commerce/config')

const PROVIDERS = [
  '@vercel/commerce-local',
  '@vercel/commerce-bigcommerce',
  '@vercel/commerce-saleor',
  '@vercel/commerce-shopify',
  '@vercel/commerce-swell',
  '@vercel/commerce-vendure',
  '@vercel/commerce-ordercloud',
  '@vercel/commerce-kibocommerce',
  '@vercel/commerce-spree',
  '@vercel/commerce-commercejs',
  '@vercel/commerce-sfcc',
]

function getProviderName() {
  return (
    process.env.COMMERCE_PROVIDER ||
    (process.env.BIGCOMMERCE_STOREFRONT_API_URL
      ? '@vercel/commerce-bigcommerce'
      : process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
      ? '@vercel/commerce-shopify'
      : process.env.NEXT_PUBLIC_SWELL_STORE_ID
      ? '@vercel/commerce-swell'
      : '@vercel/commerce-local')
  )
}

function withCommerceConfig(nextConfig = {}) {
  const config = merge(
    { commerce: { provider: getProviderName() } },
    nextConfig
  )
  const { commerce } = config
  const { provider } = commerce

  if (!provider) {
    throw new Error(
      `The commerce provider is missing, please add a valid provider name or its environment variables`
    )
  }
  if (!PROVIDERS.includes(provider)) {
    throw new Error(
      `The commerce provider "${provider}" can't be found, please use one of "${PROVIDERS.join(
        ', '
      )}"`
    )
  }

  // Update paths in `tsconfig.json` to point to the selected provider
  if (commerce.updateTSConfig !== false) {
    const tsconfigPath = path.join(
      process.cwd(),
      commerce.tsconfigPath || 'tsconfig.json'
    )
    const tsconfig = require(tsconfigPath)
    // The module path is a symlink in node_modules
    // -> /node_modules/[name]/dist/index.js
    const absolutePath = require.resolve(provider)
    // but we want references to go to the real path in /packages instead
    // -> packages/[name]/dist
    const distPath = path.join(path.relative(process.cwd(), absolutePath), '..')
    // -> /packages/[name]/src
    const modulePath = path.join(distPath, '../src')

    tsconfig.compilerOptions.paths['@framework'] = [`${modulePath}`]
    tsconfig.compilerOptions.paths['@framework/*'] = [`${modulePath}/*`]

    fs.writeFileSync(
      tsconfigPath,
      prettier.format(JSON.stringify(tsconfig), { parser: 'json' })
    )

    const webpack = config.webpack

    // To improve the DX of using references, we'll switch from `src` to `dist`
    // only for webpack so imports resolve correctly but typechecking goes to `src`
    config.webpack = (cfg, options) => {
      if (Array.isArray(cfg.resolve.plugins)) {
        const jsconfigPaths = cfg.resolve.plugins.find(
          (plugin) => plugin.constructor.name === 'JsConfigPathsPlugin'
        )

        if (jsconfigPaths) {
          jsconfigPaths.paths['@framework'] = [distPath]
          jsconfigPaths.paths['@framework/*'] = [`${distPath}/*`]
        }
      }

      return webpack ? webpack(cfg, options) : cfg
    }
  }

  return core.withCommerceConfig(config)
}

module.exports = { withCommerceConfig, getProviderName }
