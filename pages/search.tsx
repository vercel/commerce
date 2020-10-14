import { useEffect, useState } from 'react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'
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
  const { category, brand } = useSearchMeta(router.asPath)
  const activeCategory = categories.find(
    (cat) => getSlug(cat.path) === category
  )
  const activeBrand = brands.find(
    (b) => getSlug(b.node.path) === `brands/${brand}`
  )?.node
  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.entityId,
    brandId: activeBrand?.entityId,
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
              <li
                key={cat.path}
                className={cn('py-1 text-default', {
                  underline: activeCategory?.entityId === cat.entityId,
                })}
              >
                <Link href={getCategoryPath(getSlug(cat.path), brand)}>
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
              <li
                key={node.path}
                className={cn('py-1 text-default', {
                  underline: activeBrand?.entityId === node.entityId,
                })}
              >
                <Link href={getDesignerPath(getSlug(node.path), category)}>
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

// Remove trailing and leading slash
const getSlug = (path: string) => path.replace(/^\/|\/$/g, '')

const getCategoryPath = (slug: string, designer?: string) =>
  designer ? `/search/designers/${designer}/${slug}` : `/search/${slug}`

const getDesignerPath = (slug: string, category?: string) => {
  const designer = slug.replace(/^brands/, 'designers')
  return `/search/${designer}${category ? `/${category}` : ''}`
}
