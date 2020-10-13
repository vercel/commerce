import { useEffect, useState } from 'react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'
import useSearch from '@lib/bigcommerce/products/use-search'
import { Layout } from '@components/core'
import { Container, Grid } from '@components/ui'
import { ProductCard } from '@components/product'

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
  const { category, brand } = useSearchMeta(router.asPath)

  console.log('Q', category, brand)

  return (
    <Container>
      <div className="grid grid-cols-12 gap-8 mt-3 mb-20">
        <div className="col-span-2">
          <ul className="mb-10">
            <li className="py-1 text-primary font-bold tracking-wide">
              All Categories
            </li>
            {categories.map((cat) => (
              <li key={cat.path} className="py-1 text-default">
                <Link href={getCategoryPath(cat.path, brand)}>
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li className="py-1 text-primary font-bold tracking-wide">
              All Designers
            </li>
            {brands.flatMap(({ node }) => (
              <li key={node.path} className="py-1 text-default">
                <Link href={getDesignerPath(node.path, category)}>
                  <a>{node.name}</a>
                </Link>
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
            <li className="py-1 text-default">Latest arrivals</li>
            <li className="py-1 text-default">Trending</li>
            <li className="py-1 text-default">Price: Low to high</li>
            <li className="py-1 text-default">Price: High to low</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

Home.Layout = Layout

function useSearchMeta(asPath: string) {
  const [category, setCategory] = useState<string | undefined>()
  const [brand, setBrand] = useState<string | undefined>()

  useEffect(() => {
    const parts = asPath.split('/')

    // console.log('parts', parts)

    let c = parts[2]
    let b = parts[3]

    if (c === 'designers') {
      c = parts[4]
    }

    if (c !== category) setCategory(c)
    if (b !== brand) setBrand(b)
  }, [asPath])

  return { category, brand }
}

function getCategoryPath(path: string, designer?: string) {
  return designer ? `/search/designers/${designer}${path}` : `/search${path}`
}

function getDesignerPath(path: string, category?: string) {
  // Remove the trailing slash and replace /brands with /designers
  const designer = path.replace(/^\/brands/, '/designers').replace(/\/$/, '')
  const href = `/search${designer}`

  return category ? `${href}/${category}` : href
}
