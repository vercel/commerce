import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import getAllPages from '@lib/bigcommerce/api/operations/get-all-pages'
import { Layout } from '@components/core'
import { Container } from '@components/ui'

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { pages } = await getAllPages()
  return {
    props: { pages },
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
