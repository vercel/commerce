import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { ProductGrid } from '@components/product'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()
  return {
    props: { products: products.slice(0, 6) },
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ProductGrid
        products={[...products, ...products, ...products, ...products]}
        layout="C"
      />
      {/* <ProductGrid products={[...products.slice(0, 3)]} layout={2} /> */}
      {/* <div></div> */}
      {/* <ProductGrid products={products.slice(3)} /> */}
    </>
  )
}

Home.Layout = Layout
