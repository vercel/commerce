import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'
import useSearch from '@lib/bigcommerce/products/use-search'
import { Layout } from '@components/core'
import { Container, Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import { useRouter } from 'next/router'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { categories, brands } = await getSiteInfo()

  return {
    props: { categories, brands },
  }
}

export default function Home({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { q } = router.query
  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
  })

  return (
    <Container>
      <div className="grid grid-cols-12 gap-8 mt-3 mb-20">
        <div className="col-span-2">
          <ul className="mb-10">
            <li className="py-1 text-primary font-bold tracking-wide">
              All Categories
            </li>
            {categories.map((cat) => (
              <li key={cat.path} className="py-1 text-secondary">
                <a href="#">{cat.name}</a>
              </li>
            ))}
          </ul>
          <ul>
            <li className="py-1 text-primary font-bold tracking-wide">
              All Designers
            </li>
            {brands.flatMap(({ node }) => (
              <li key={node.path} className="py-1 text-secondary">
                <a href="#">{node.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-8">
          {data ? (
            <>
              {q && (
                <div className="mb-12">
                  {data.found ? (
                    <>Showing {data.products.length} results for</>
                  ) : (
                    <>There are no products that match</>
                  )}{' '}
                  "<strong>{q}</strong>"
                </div>
              )}
              <Grid
                items={data.products}
                layout="normal"
                wrapper={ProductCard}
              />
            </>
          ) : (
            <div>Searching...</div>
          )}
        </div>
        <div className="col-span-2">
          <ul>
            <li className="py-1 text-primary font-bold tracking-wide">
              Relevance
            </li>
            <li className="py-1 text-secondary">Latest arrivals</li>
            <li className="py-1 text-secondary">Trending</li>
            <li className="py-1 text-secondary">Price: Low to high</li>
            <li className="py-1 text-secondary">Price: High to low</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

Home.Layout = Layout
