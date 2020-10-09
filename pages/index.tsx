import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()
  const { categories } = await getSiteInfo()

  return {
    props: { products, categories },
  }
}

export default function Home({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid items={products.slice(0, 3)} wrapper={ProductCard} />
      <Marquee
        items={products.slice(0, 3)}
        wrapper={(p: any) => <ProductCard {...p} variant="slim" />}
      />
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
      <Grid items={products.slice(3, 6)} layout="B" wrapper={ProductCard} />
      <Marquee
        items={[...products.slice(3, 6)]}
        variant="secondary"
        wrapper={(p: any) => <ProductCard {...p} variant="slim" />}
      />
      <div className="py-12 flex flex-row w-full">
        <div className="pr-3 w-48">
          <ul className="uppercase">
            <li>
              <h2 className="font-bold">All Categories</h2>
            </li>
            {categories.map((cat) => (
              <li key={cat.path} className="mt-2">
                <a href="#">{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <Grid
            items={[
              ...products.slice(6),
              ...products.slice(6),
              ...products.slice(6),
            ]}
            layout="normal"
            wrapper={ProductCard}
          />
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
