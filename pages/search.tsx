import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'
import useSearch from '@lib/bigcommerce/products/use-search'
import { Layout } from '@components/core'
import { Container, Grid, Skeleton } from '@components/ui'
import { ProductCard } from '@components/product'
import getSlug from '@utils/get-slug'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@utils/search'
import { range } from 'lodash'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { pages } = await getAllPages()
  const { categories, brands } = await getSiteInfo()

  return {
    props: { pages, categories, brands },
  }
}

const SORT = Object.entries({
  'latest-desc': 'Latest arrivals',
  'trending-desc': 'Trending',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
})

export default function Search({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { asPath } = router
  const { q, sort } = router.query
  const query = filterQuery({ q, sort })

  const { pathname, category, brand } = useSearchMeta(asPath)
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
    sort: typeof sort === 'string' ? sort : '',
  })

  return (
    <Container>
      <div className="grid grid-cols-12 gap-8 mt-3 mb-20">
        <div className="col-span-2">
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={{ pathname: getCategoryPath('', brand), query }}>
                <a>All Categories</a>
              </Link>
            </li>
            {categories.map((cat) => (
              <li
                key={cat.path}
                className={cn('py-1 text-accents-8', {
                  underline: activeCategory?.entityId === cat.entityId,
                })}
              >
                <Link
                  href={{
                    pathname: getCategoryPath(getSlug(cat.path), brand),
                    query,
                  }}
                >
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={{ pathname: getDesignerPath('', category), query }}>
                <a>All Designers</a>
              </Link>
            </li>
            {brands.flatMap(({ node }) => (
              <li
                key={node.path}
                className={cn('py-1 text-accents-8', {
                  underline: activeBrand?.entityId === node.entityId,
                })}
              >
                <Link
                  href={{
                    pathname: getDesignerPath(getSlug(node.path), category),
                    query,
                  }}
                >
                  <a>{node.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-8">
          <div className="mb-12 animate__animated animate__fadeIn">
            {data ? (
              <>
                <span
                  className={cn('animate__animated', {
                    animate__fadeIn: data.found,
                    hidden: !data.found,
                  })}
                >
                  Showing {data.products.length} results for "
                  <strong>{q}</strong>"
                </span>
                <span
                  className={cn('animate__animated', {
                    animate__fadeIn: !data.found,
                    hidden: data.found,
                  })}
                >
                  There are no products that match "<strong>{q}</strong>"
                </span>
              </>
            ) : (
              <>
                Searching for: "<strong>{q}</strong>"
              </>
            )}
          </div>
          <Grid
            items={data ? data.products : range(12)}
            layout="normal"
            wrapper={
              data
                ? (p: any) => (
                    <ProductCard
                      className="animate__animated animate__fadeIn"
                      {...p}
                    />
                  )
                : () => (
                    <Skeleton
                      className="w-full animate__animated animate__fadeIn"
                      height={325}
                    />
                  )
            }
          />
        </div>
        <div className="col-span-2">
          <ul>
            <li className="py-1 text-base font-bold tracking-wide">Sort</li>
            <li
              className={cn('py-1 text-accents-8', {
                underline: !sort,
              })}
            >
              <Link href={{ pathname, query: filterQuery({ q }) }}>
                <a>Relevance</a>
              </Link>
            </li>
            {SORT.map(([key, text]) => (
              <li
                key={key}
                className={cn('py-1 text-accents-8', {
                  underline: sort === key,
                })}
              >
                <Link href={{ pathname, query: filterQuery({ q, sort: key }) }}>
                  <a>{text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}

Search.Layout = Layout
