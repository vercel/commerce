import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'
import { useRouter } from 'next/router'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()
  const { categories, brands } = await getSiteInfo()

  return {
    props: { products, categories, brands },
  }
}

export default function Home({
  products,
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  return (
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
        <div className="mb-12">
          Showing 8 results for "<strong>{router.query.q}</strong>"
        </div>
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
  )
}

Home.Layout = Layout
