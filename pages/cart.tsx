import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllProducts from '@lib/bigcommerce/api/operations/get-all-products'
import { Layout } from '@components/core'
import { Container } from '@components/ui'
import getSiteInfo from '@lib/bigcommerce/api/operations/get-site-info'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts()
  const { categories, brands } = await getSiteInfo()

  return {
    props: { products, categories, brands },
  }
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return (
    <Container>
      <h2 className="pt-1 pb-4 text-2xl leading-7 font-bold text-base tracking-wide">
        My Cart
      </h2>
    </Container>
  )
}

Home.Layout = Layout
