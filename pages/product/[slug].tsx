import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import getProduct from '@lib/bigcommerce/api/operations/get-product'
import { Layout } from '@components/core'
import { ProductView } from '@components/product'
import getAllProductPaths from '@lib/bigcommerce/api/operations/get-all-product-paths'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  console.log('SLUG', params!.slug)
  const { product } = await getProduct({ variables: { slug: params!.slug } })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  const productData = {
    name: 'T-Shirt',
    description: `
      Nothing undercover about this tee. Nope. This is the official Bad
      Boys tee. Printed in white or black ink on Black, Brown, or Oatmeal.
      Like everything in this collection, it is extremely limited edition
      and available for 10 days only. This is a limited edition production
      run. Printing starts when the drop ends. Reminder: Bad Boys For
      Life. Shipping may take 10+ days due to COVID-19.
    `,
    images: null,
    prices: '$50',
    colors: ['black', 'white', 'pink'],
    sizes: ['s', 'm', 'l', 'xl', 'xxl'],
  }
  return {
    props: {
      product,
      productData,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths() {
  const { products } = await getAllProductPaths()

  return {
    paths: products.map((product) => `/product${product!.node.path}`),
    fallback: false,
  }
}

export default function Slug({
  product,
  productData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductView product={product} productData={productData} />
  )
}

Slug.Layout = Layout
