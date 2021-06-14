const PROVIDERS = ['bigcommerce', 'shopify', 'swell', 'vendure']

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

const name = getProviderName()

module.exports = {
  compilerOptions: {
    baseUrl: '.',
    target: 'esnext',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'esnext',
    moduleResolution: 'node',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    paths: {
      '@lib/*': ['lib/*'],
      '@utils/*': ['utils/*'],
      '@config/*': ['config/*'],
      '@assets/*': ['assets/*'],
      '@components/*': ['components/*'],
      '@commerce': ['framework/commerce'],
      '@commerce/*': ['framework/commerce/*'],
      // Update paths to point to the selected provider
      '@framework': [`framework/${name}`],
      '@framework/*': [`framework/${name}/*`],
    },
  },
  include: ['next-env.d.ts', '**/*.d.ts', '**/*.ts', '**/*.tsx', '**/*.js'],
  exclude: [
    'node_modules',
    // When running for production it may be useful to exclude the other providers
    // from TS checking
    ...(process.env.VERCEL
      ? PROVIDERS.filter((p) => p !== name).map((p) => `framework/${p}`)
      : []),
  ],
}
