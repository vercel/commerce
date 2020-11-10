import { FC, useState } from 'react'
import cn from 'classnames'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import useSearch from '@bigcommerce/storefront-data-hooks/products/use-search'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container, Grid, Skeleton } from '@components/ui'
import { Filter } from '@components/icons'

import rangeMap from '@lib/range-map'
import getSlug from '@lib/get-slug'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

interface OptionLinkProps {
  active: boolean
  name: string
  pathname: string
  query: string
}

interface FilterOptionsProps {
  pathname: string
  title: string
}

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { categories, brands } = await getSiteInfo({ config, preview })

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
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const router = useRouter()
  const { asPath } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

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

  const OptionLink: FC<OptionLinkProps> = ({
    active,
    name,
    pathname,
    query
  }) => (
    <li
      className={cn('py-1 text-accents-8', {
        underline: active,
      })}
    >
      <Link
        href={{
          pathname,
          query,
        }}
      >
        <a>{name}</a>
      </Link>
    </li>
  )

  const FilterOptions: FC<FilterOptionsProps> = ({
    pathname,
    title,
    children,
  }) => (
    <ul>
      <li className="py-1 text-base font-bold tracking-wide">
        <Link href={{ pathname, query }}>
          <a>{title}</a>
        </Link>
      </li>
      {children}
    </ul>
  )

  const Sort = () => (
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
        <OptionLink
          key={key}
          pathname={pathname}
          active={sort === key}
          name={text}
          query={filterQuery({ q, sort: key })}
        />
      ))}
    </ul>
  )

  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 mt-3 mb-20">
        <div className="col-span-2 hidden md:block">
          <FilterOptions
            title="All Categories"
            pathname={getCategoryPath('', brand)}
          >
            <>
              {categories.map((cat) => (
                <OptionLink
                  key={cat.path}
                  pathname={getCategoryPath(cat.path, brand)}
                  active={activeCategory?.entityId === cat.entityId}
                  name={cat.name}
                  query={query}
                />
              ))}
            </>
          </FilterOptions>
          <FilterOptions
            title="All Designers"
            pathname={getDesignerPath('', category)}
          >
            <>
              {brands.flatMap(({ node }) => (
                <OptionLink
                  key={node.path}
                  pathname={getDesignerPath(node.path, category)}
                  active={activeBrand?.entityId === node.entityId}
                  name={node.name}
                  query={query}
                />
              ))}
            </>
          </FilterOptions>
        </div>
        <div className="col-span-12 md:col-span-8">
          {(q || activeCategory || activeBrand) && (
            <div className="mb-6 transition ease-in duration-75">
              <div className="flex justify-between">
                {data ? (
                  <>
                    <span
                      className={cn('animated', {
                        fadeIn: data.found,
                        hidden: !data.found,
                      })}
                    >
                      Showing {data.products.length} results{' '}
                      {q && (
                        <>
                          for "<strong>{q}</strong>"
                        </>
                      )}
                    </span>
                    <span
                      className={cn('animated', {
                        fadeIn: !data.found,
                        hidden: data.found,
                      })}
                    >
                      {q ? (
                        <>
                          There are no products that match "<strong>{q}</strong>"
                        </>
                      ) : (
                        <>
                          There are no products that match the selected category &
                          designer
                        </>
                      )}
                    </span>
                  </>
                ) : q ? (
                  <div>
                    Searching for: "<strong>{q}</strong>"
                  </div>
                ) : (
                  <>Searching...</>
                )}

                <button
                  className="md:invisible text-accents-8 outline-none"
                  onClick={() => setShowMobileMenu(prev => !prev)}
                >
                  <Filter width={22} />
                </button>
              </div>

              {showMobileMenu && (
                <div className="flex justify-between mt-4 md:hidden">
                  <div className="flex flex-col">
                  <FilterOptions
                    title="All Categories"
                    pathname={getCategoryPath('', brand)}
                  >
                    <>
                      {categories.map((cat) => (
                        <OptionLink
                          key={cat.path}
                          pathname={getCategoryPath(cat.path, brand)}
                          active={activeCategory?.entityId === cat.entityId}
                          name={cat.name}
                          query={query}
                        />
                      ))}
                    </>
                  </FilterOptions>
                  <FilterOptions
                    title="All Designers"
                    pathname={getDesignerPath('', category)}
                  >
                    <>
                      {brands.flatMap(({ node }) => (
                        <OptionLink
                          key={node.path}
                          pathname={getDesignerPath(node.path, category)}
                          active={activeBrand?.entityId === node.entityId}
                          name={node.name}
                          query={query}
                        />
                      ))}
                    </>
                  </FilterOptions>
                  </div>
                  <Sort />
                </div>
              )}
            </div>
          )}

          {data ? (
            <Grid layout="normal">
              {data.products.map(({ node }) => (
                <ProductCard
                  variant="simple"
                  key={node.path}
                  className="animated fadeIn"
                  product={node}
                  imgWidth={480}
                  imgHeight={480}
                />
              ))}
            </Grid>
          ) : (
            <Grid layout="normal">
              {rangeMap(12, (i) => (
                <Skeleton
                  key={i}
                  className="w-full animated fadeIn"
                  height={325}
                />
              ))}
            </Grid>
          )}
        </div>
        <div className="col-span-2 hidden md:block">
          <Sort />
        </div>
      </div>
    </Container>
  )
}

Search.Layout = Layout
