import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Container, Marquee } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Container className="py-12">
        <h3 className="tag">New releases</h3>
        <Grid layout="normal" className="mt-8 mb-16">
          {products.slice(0, 6).map((product: any, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </Grid>
        <h3 className="tag">Bestsellers</h3>
        <Grid layout="normal" className="mt-8 mb-16">
          {products.slice(0, 6).map((product: any, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </Grid>
      </Container>
    </>
  )
}

Home.Layout = Layout
