import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import { Layout } from '@components/core'
import { ProductView } from '@components/product'
import getAllProductPaths from '@bigcommerce/storefront-data-hooks/api/operations/get-all-product-paths'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })

  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: { pages, product },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product) => {
            arr.push(`/${locale}/product${product.node.path}`)
          })
          return arr
        }, [])
      : products.map((product) => `/product${product.node.path}`),
    // If your store has tons of products, enable fallback mode to improve build times!
    fallback: false,
  }
}

export default function Slug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <ProductView product={product} />
  )
}

Slug.Layout = Layout
