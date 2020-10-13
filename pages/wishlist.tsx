import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Container } from '@components/ui'
import { WishlistCard } from '@components/wishlist'

import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()
  const { categories, brands } = await getSiteInfo()

  return {
    props: { products, categories, brands },
  }
}

export default function Home({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
        </div>
        <div className="col-span-8">
          <h2 className="pt-1 px-3 pb-4 text-2xl leading-7 font-bold text-primary tracking-wide">
            My Wishlist
          </h2>
          <div className="group flex flex-col">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <WishlistCard />
            ))}
          </div>
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
