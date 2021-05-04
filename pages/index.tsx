import { Layout } from '@components/common'
import { Grid, Marquee, Hero } from '@components/ui'
import { BagelCard } from '@components/product'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid>
        {/* main product */}
        {products.slice(0, 3).map((product, i) => (
          <BagelCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      {/* <FeaturedIn>Featured In</FeaturedIn> */}
      {/* <Banana>Banana Comparison</Banana> */}
      {/* <Nutrition></Nutrition> */}
      {/* <Mission></Mission> */}
      <Marquee variant="secondary">
        {/* instagram */}
        {products.slice(0, 3).map((product, i) => (
          <BagelCard
            key={product.id}
            product={product}
            variant="slim"
            imgProps={{
              width: 320,
              height: 320,
            }}
          />
        ))}
      </Marquee>
    </>
  )
}

Home.Layout = Layout
