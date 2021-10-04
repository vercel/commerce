import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';

interface Props {
  products: any
}
export default function Home({ products }: Props) {
  return (
    <>
      <p>
        TOTAL: {products?.length}
      </p>
      {JSON.stringify(products[0])}
    </>
  )
}


export async function getServerSideProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    // const productsPromise = commerce.getAllFacets({
    variables: {
      first: 70,
      //  filter: {
      //   name: {
      //     contains: 'ca'
      //   }
      // }
    },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })

  const { products } = await productsPromise


  return {
    props: { products },
  }
}


Home.Layout = Layout
