import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Grid, Marquee } from '@components/ui'

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
      <Grid items={products.slice(0, 3)} />
      <Marquee
        items={products.slice(0, 3)}
        wrapper={(p: any) => (
          <div className="flex flex-1 justify-end">
            <img
              className="w-full"
              src={p.node.images.edges[0].node.urlSmall}
            />
            <span className="bg-black text-white inline-block p-3 font-bold text-2xl break-words">
              {p.node.name}
            </span>
          </div>
        )}
      />
      <Grid items={products.slice(3, 6)} layout="B" />
      <Marquee
        variant="secondary"
        items={products.slice(0, 3)}
        wrapper={() => (
          <div className="flex flex-1">
            <h3 className="bg-black text-white inline p-3 font-bold text-2xl">
              This is a very short title
            </h3>
          </div>
        )}
      />
      <div className="bg-black">
        <h2 className=""> A very long title with a nice description</h2>
      </div>
    </>
  )
}

Home.Layout = Layout
