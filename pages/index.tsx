import { useMemo } from 'react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getConfig } from '@lib/bigcommerce/api'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'
import rangeMap from '@lib/range-map'
import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import HomeAllProductsGrid from '@components/core/HomeAllProductsGrid'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
  })
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
  })
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
  })
  const { categories, brands } = await getSiteInfo({ config })
  const { pages } = await getAllPages({ config })

  return {
    props: {
      featuredProducts,
      bestSellingProducts,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 10,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  featuredProducts,
  bestSellingProducts,
  newestProducts,
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { featured, bestSelling } = useMemo(() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  }, [newestProducts, featuredProducts, bestSellingProducts])

  return (
    <div>
      <Grid>
        {featured.slice(0, 3).map(({ node }, i) => (
          <ProductCard
            key={node.path}
            product={node}
            // The first image is the largest one in the grid
            imgWidth={i === 0 ? '65vw' : '30vw'}
            imgHeight={i === 0 ? '45vw' : '22vw'}
            priority
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {bestSelling.slice(3, 6).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
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
            // The second image is the largest one in the grid
            imgWidth={i === 1 ? 1600 : 820}
            imgHeight={i === 1 ? 1600 : 820}
          />
        ))}
      </Grid>
      <Marquee>
        {bestSelling.slice(0, 3).map(({ node }) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
          />
        ))}
      </Marquee>
      <HomeAllProductsGrid
        categories={categories}
        brands={brands}
        newestProducts={newestProducts}
      />
    </div>
  )
}

Home.Layout = Layout
