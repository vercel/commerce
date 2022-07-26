import type { VFC } from 'react'
import { SEO } from '@components/common'

const Head: VFC = () => {
  return (
    <SEO>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && (
        <link
          rel="preconnect"
          href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(
            /(^\w+:|^)\/\//,
            ''
          )}`}
        />
      )}
    </SEO>
  )
}

export default Head
