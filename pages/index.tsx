import { useMemo } from 'react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getConfig } from '@lib/bigcommerce/api'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'
import rangeMap from '@lib/range-map'
import { getCategoryPath, getDesignerPath } from '@utils/search'
import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import Link from 'next/link'

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
      featured: rangeMap(
        6,
        (i) => featuredProducts[i] ?? products.shift()
      ).filter(nonNullable),
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
      <div className="py-12 flex flex-col md:flex-row w-full px-6">
        <div className="pr-3 w-full md:w-48 relative">
          <div className="flex flex-row w-full justify-around mb-12 md:mb-0 md:block md:sticky md:top-32">
            <ul className="mb-10">
              <li className="py-1 text-base font-bold tracking-wide">
                <Link href={getCategoryPath('')}>
                  <a>All Categories</a>
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.path} className="py-1 text-accents-8">
                  <Link href={getCategoryPath(cat.path)}>
                    <a>{cat.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="">
              <li className="py-1 text-base font-bold tracking-wide">
                <Link href={getDesignerPath('')}>
                  <a>All Designers</a>
                </Link>
              </li>
              {brands.flatMap(({ node }) => (
                <li key={node.path} className="py-1 text-accents-8">
                  <Link href={getDesignerPath(node.path)}>
                    <a>{node.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <Grid layout="normal">
            {newestProducts.map(({ node }) => (
              <ProductCard
                key={node.path}
                product={node}
                variant="simple"
                imgWidth={480}
                imgHeight={480}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

Home.Layout = Layout
