import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { pages } = await getAllPages()
  const { products } = await getAllProducts()
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 3 },
  })
  const { categories, brands } = await getSiteInfo()

  return {
    props: { pages, products, featuredProducts, categories, brands },
  }
}

export default function Home({
  products,
  featuredProducts,
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="mt-3">
      <Grid>
        {featuredProducts.map((p: any) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((p: any) => (
          <ProductCard key={p.id} {...p} variant="slim" />
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
        {products.slice(3, 6).map((p: any) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </Grid>
      <Marquee>
        {products.slice(0, 3).map((p: any) => (
          <ProductCard key={p.id} {...p} variant="slim" />
        ))}
      </Marquee>
      <div className="py-12 flex flex-row w-full px-12">
        <div className="pr-3 w-48 relative">
          <div className="sticky top-2">
            <ul className="mb-10">
              <li className="py-1 text-base font-bold tracking-wide">
                All Categories
              </li>
              {categories.map((cat) => (
                <li key={cat.path} className="py-1 text-accents-8">
                  <a href="#">{cat.name}</a>
                </li>
              ))}
            </ul>
            <ul className="">
              <li className="py-1 text-base font-bold tracking-wide">
                All Designers
              </li>
              {brands.flatMap(({ node }) => (
                <li key={node.path} className="py-1 text-accents-8">
                  <a href="#">{node.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <Grid layout="normal">
            {products.map((p: any) => (
              <ProductCard key={p.id} {...p} variant="simple" />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

Home.Layout = Layout
