import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import ProductCard from '@components/product/ProductCard/FUTURE_ProductCard'
import { Grid, Marquee, Hero } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllPages from '@framework/api/operations/get-all-pages'

// Outputs from providers should already be normalized
// TODO (bc) move this to the provider

function normalize(arr: any[]) {
  // Normalizes products arr response and flattens node edges
  return arr.map(
    ({
      node: { entityId: id, images, variants, productOptions, ...rest },
    }) => ({
      id,
      images: images.edges.map(
        ({ node: { urlOriginal, altText, ...rest } }: any) => ({
          url: urlOriginal,
          alt: altText,
          ...rest,
        })
      ),
      variants: variants.edges.map(({ node }: any) => node),
      productOptions: productOptions.edges.map(({ node }: any) => node),
      ...rest,
    })
  )
}

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products: rawProducts } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const products = normalize(rawProducts)

  // console.log(products)

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
    <div>
      <Grid>
        {products.slice(0, 3).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      {/* <Marquee variant="secondary">
        {bestSelling.slice(3, 6).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgProps={{
              width: 320,
              height: 320,
            }}
          />
        ))}
      </Marquee>
      <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
      />
      <Grid layout="B">
        {featured.slice(3, 6).map(({ node }, i) => (
          <ProductCard
            key={node.path}
            product={node}
            imgProps={{
              width: i === 1 ? 1080 : 540,
              height: i === 1 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {bestSelling.slice(0, 3).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgProps={{
              width: 320,
              height: 320,
            }}
          />
        ))}
      </Marquee> */}
      {/* <HomeAllProductsGrid
        newestProducts={newestProducts}
        categories={categories}
        brands={brands}
      /> */}
    </div>
  )
}

Home.Layout = Layout
