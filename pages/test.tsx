import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { ProductCard } from '@commerce/types/product';
interface Props {
  productDetail: ProductCard[],
}
export default function Home({ productDetail }: Props) {
  return (
    <>
      <p>
        TOTAL: {productDetail}
      </p>
      {/* {JSON.stringify(productDetail)} */}
    </>
  )
}


export async function getServerSideProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  
  const productsPromise = commerce.getProduct({
    // const productsPromise = commerce.getAllFacets({
    variables: {
      slug: "hand-trowel"
      //  filter: {
      //   name: {
      //     contains: 'ca'
      //   }
      // }
    },
    config,
    // preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })

  const { product } = await productsPromise
  const productDetail = JSON.stringify(product)
  return {
    props: { productDetail },
  }
}


Home.Layout = Layout
