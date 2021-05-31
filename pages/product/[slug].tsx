import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

import { getConfig } from '@framework/api'
import getProduct from '@framework/product/get-product'
import getAllPages from '@framework/common/get-all-pages'
import getAllProductPaths from '@framework/product/get-all-product-paths'
import getAllProducts from '@framework/product/get-all-products'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { products: relatedProducts } = await getAllProducts({
    variables: { first: 4 },
    config,
    preview,
  })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
      relatedProducts,
    },
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
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product as any} relatedProducts={relatedProducts} />
  )
}

Slug.Layout = Layout
