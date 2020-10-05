import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()

  return {
    props: { products },
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid items={products.slice(0, 3)} wrapper={ProductCard} />
      <Marquee
        items={[...products.slice(3, 6)]}
        wrapper={(p: any) => (
          <div className="relative overflow-hidden p-6 box-border">
            <img
              className="object-scale-down h-24"
              src={p.node.images.edges[0].node.urlSmall}
            />
            <div className="absolute inset-0 flex items-center justify-end mr-8">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {p.node.name}
              </span>
            </div>
          </div>
        )}
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
        wrapper={(p: any) => (
          <div className="relative overflow-hidden p-6 box-border">
            <img
              className="object-scale-down h-24"
              src={p.node.images.edges[0].node.urlSmall}
            />
            <div className="absolute inset-0 flex items-center justify-end mr-8">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {p.node.name}
              </span>
            </div>
          </div>
        )}
      />
      <div className="py-12 flex flex-row w-full">
        <div className="flex-0 pr-3 w-48">
          ALL CATEGORIES ACCESSORIES BAGS CLOTHING SHOES ALL DESIGNERS 032c 1017
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
