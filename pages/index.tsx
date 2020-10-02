import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from 'lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { ProductGrid } from '@components/product'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()
  return {
    props: { products },
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('PRODUCTS', products)
  return <ProductGrid products={products} />
}

Home.Layout = Layout
