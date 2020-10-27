import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'
import useWishlist from '@lib/bigcommerce/wishlist/use-wishlist'
import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'
import { WishlistCard } from '@components/wishlist'

import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { pages } = await getAllPages({ preview })
  const { categories, brands } = await getSiteInfo({ preview })

  return {
    props: { pages, categories, brands },
  }
}

export default function Home({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useWishlist()
  return (
    <Container>
      <div className="grid grid-cols-12 gap-8 mt-3 mb-20">
        <div className="col-span-2">
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              All Categories
            </li>
            {categories.map((cat) => (
              <li key={cat.path} className="py-1 text-secondary">
                <a href="#">{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-8">
          <Text variant="pageHeading">My Wishlist</Text>
          <div className="group flex flex-col">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <WishlistCard key={i} />
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <ul>
            <li className="py-1 text-base font-bold tracking-wide">
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
